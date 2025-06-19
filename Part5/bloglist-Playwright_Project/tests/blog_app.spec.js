const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/tests/reset')
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
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('sanchit')
            await page.getByTestId('password').fill('string')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('sanchit logged in')).toBeVisible()

        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('sanchit')
            await page.getByTestId('password').fill('nostring')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('username or password is incorrect')).toBeVisible()
        })


    })
})