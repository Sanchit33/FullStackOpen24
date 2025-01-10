const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const hepler = require('./test_helper')

const api = supertest(app)

// this is not the final version need to change this in future
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(hepler.intialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(hepler.intialBlogs[1])
    await blogObject.save()
})

test('blogs are retured as json', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are retured', async() => {
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, 2)
})

test('the first blog is about React patterns', async() => {
    const res = await api.get('/api/blogs')

    const contents = res.body.map(e => e.title)

    assert(contents.includes('React patterns'), true)
})

test('the blog post has unique identifier property named as id', async() => {
    const res = await hepler.blogsInDb()

    assert("id" in res[0], true)
})

after(async () => {
    await mongoose.connection.close()
})