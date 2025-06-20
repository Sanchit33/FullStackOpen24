const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url) => {
    await page.getByRole('button', {name:'Create new blog'}).click()
    await page.getByTestId('1001').fill(title)
    await page.getByTestId('1002').fill(author)
    await page.getByTestId('1003').fill(url)
    await page.getByRole('button', {name:'create'}).click()
}

export{ loginWith, createBlog }