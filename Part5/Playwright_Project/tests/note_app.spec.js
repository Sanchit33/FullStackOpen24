const {describe, test, expect, beforeEach} = require('@playwright/test')
const {createNote, loginWith} = require('./helper')

describe('Note App Tests', () => {

    beforeEach(async ({page, request}) => {

        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'sanchit',
                username: 'sanchit33',
                password: 'string'
            }
        })
        await page.goto('/')
    })

    test('front page can be opened', async ({page}) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('login form can be opened', async ({page}) => {

       loginWith(page,"sanchit33", "string")

       await expect(page.getByText('sanchit logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({page}) => {
        loginWith(page, 'sanchit33', 'wrong')

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('sanchit loggged in')).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({page}) => {
            loginWith(page, 'sanchit33', 'string')
        })

        test('a new note can be created', async ({page}) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and several notes exists', () => {
            beforeEach(async ({page}) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('important can be changed', async ({page}) => {
                const otherNoteText = await page.getByText('second note')
                const otherNoteElement = await otherNoteText.locator('..')

                await otherNoteElement.getByRole('button', {name: 'make not important'}).click()
                await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })

            test('one of those can be made nonimportant', async ({page}) => {
                const otherNoteElement = await page.getByText('first note').locator('..')

                await otherNoteElement.getByRole('button', {name: 'make not important'}).click()
                await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })
        })


    })
})