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
            await createBlog(page, 'Test1', 'Sanchit1', 'http://localhost:3003')
            await createBlog(page, 'Test2', 'Sanchit2', 'http://localhost:3003')
            await createBlog(page, 'Test3', 'Sanchit3', 'http://localhost:3003')
            await expect(page.getByText('sanchit logged in')).toBeVisible()
        })

        test('a new blog can be created', async({page}) => {
            await createBlog(page, 'Test4', 'Sanchit4', 'http://localhost:3003')

            await expect(page.locator('.blog').filter({hasText: 'Sanchit4'})).toBeVisible()
        })

        test('A blog can be liked', async({page}) => {
            await createBlog(page, 'Test5', 'Sanchit5', 'http://localhost:3003')

            const blog = page.locator('.blog:has-text("Sanchit5")')

            await blog.getByRole('button', {name:'view'}).click()
            await page.getByRole('button', {name:'like'}).click()

            await expect(page.getByText('1 likes')).toBeVisible()

        })

        test('User who added the blog can delete the blog', async({page}) => {
            await createBlog(page, 'Test6', 'Sanchit6', 'http://localhost:3003')
            await createBlog(page, 'Test7', 'Sanchit7', 'http://localhost:3003')
            
            const blog = page.locator('.blog:has-text("Sanchit6")')
            
            await blog.getByRole('button', {name:'view'}).click()

            const removeBtn = page.getByRole('button', {name: 'remove'})
            await expect(removeBtn).toBeVisible();

            page.on('dialog', async (dialog) => {
                await dialog.accept()
            })

            await removeBtn.click()
            await expect(blog).not.toBeVisible()
        })

        test('Only user who added the blog can see the delete button', async({page, request}) => {
            await request.post('/api/users', {
            data: {
                username: 'sanchit2',
                name: 'Sanchit2',
                password: 'string2'
            }
            })

            await page.getByRole('button', {name:'Logout'}).click()
            await loginWith(page, 'sanchit2', 'string2')

            const blog = page.locator('.blog:has-text("Sanchit1")')
            await blog.getByRole('button', {name:'view'}).click()

            await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
        })

        test('blogs are arranged in the order according to the likes', async({page}) => {
            const blog1 = page.locator('.blog', { hasText: 'Sanchit1' });
            const blog2 = page.locator('.blog', { hasText: 'Sanchit2' });
            const blog3 = page.locator('.blog', { hasText: 'Sanchit3' });

            await blog1.getByRole('button', { name: 'view' }).click()
            await blog2.getByRole('button', { name: 'view' }).click()
            await blog3.getByRole('button', { name: 'view' }).click()
            
            await blog3.getByRole('button', { name: 'like' }).click()
            await blog3.getByRole('button', { name: 'like' }).click()
            await blog2.getByRole('button', { name: 'like' }).click()
            await blog3.getByRole('button', { name: 'like' }).click()

            const blogTitlesInOrder = await page.locator('.blog').allTextContents()
            expect(blogTitlesInOrder[0]).toContain('Sanchit3');
            expect(blogTitlesInOrder[1]).toContain('Sanchit2');
            expect(blogTitlesInOrder[2]).toContain('Sanchit1');

        })
    })
})