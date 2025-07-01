const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'sanchit',
                name: 'Sanchit',
                password: 'string'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: "login" })).toBeVisible()

    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'sanchit', 'string')

            await expect(page.getByText('sanchit logged in')).toBeVisible()

        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'sanchit', 'nostring')

            await expect(page.getByText('username or password is incorrect')).toBeVisible()
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'sanchit', 'string')
            await expect(page.getByText('sanchit logged in')).toBeVisible()
        })

        test('a new blog can be created', async({page}) => {
            await createBlog(page, 'Iran-Israel Conflict', 'Sanchit', 'http://localhost:3003')

            await expect(page.getByText('Iran-Israel Conflict Sanchit')).toBeVisible()
        })

        test('A blog can be liked', async({page}) => {
            await createBlog(page, 'Iran-Israel Conflict', 'Sanchit', 'http://localhost:3003')

            await page.getByRole('button', {name:'view'}).click()
            await page.getByRole('button', {name:'like'}).click()

            await expect(page.getByText('1 likes')).toBeVisible()

        })

        test('User who added the blog can delete the blog', async({page}) => {
            await createBlog(page, 'India-Pakistan Conflict', 'Sanchit', 'http://localhost:3003')
            await createBlog(page, 'US-Iran Conflict', 'Sanchit', 'http://localhost:3003')
            
            const blog = page.locator('.blog:has-text("India-Pakistan Conflict")')
            
            await blog.getByRole('button', {name:'view'}).click()

            const removeBtn = page.getByRole('button', {name: 'remove'})
            await expect(removeBtn).toBeVisible();

            page.on('dialog', async (dialog) => {
                await dialog.accept()
            })

            await removeBtn.click()
            await expect(blog).not.toBeVisible()
        })
    })
})