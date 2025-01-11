const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// this is not the final version need to change this in future
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.intialBlogs
    .map(blog => new Blog(blog))

    await Promise.all(blogObject.map(blog => blog.save()))
})

test('blogs are retured as json', async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are retured', async() => {
    const res = await api.get('/api/blogs')

    assert.strictEqual(res.body.length, helper.intialBlogs.length)
})

test('the first blog is about React patterns', async() => {
    const res = await api.get('/api/blogs')

    const contents = res.body.map(e => e.title)

    assert(contents.includes('React patterns'), true)
})

test('the blog post has unique identifier property named as id', async() => {
    const res = await helper.blogsInDb()

    assert("id" in res[0], true)
})

test('valid blog can be added', async() => {
    const newBlog = {
        title: "React Native Pattern",
        author: "Sanchit Shinde",
        url: "https://reactpatterns.com/",
        likes: 3,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    const contents = res.body.map(blog => blog.title)

    assert.strictEqual(res.body.length, helper.intialBlogs.length + 1)
    assert(contents.includes('React Native Pattern'), true)

})

test('if like is not given than it should return 0', async() =>{
    const newBlog = {
        title: "React Native Pattern",
        author: "Sanchit Shinde",
        url: "https://reactpatterns.com/",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const recentBlog = res.body[helper.intialBlogs.length]
    console.log(recentBlog)

    assert(recentBlog.likes === 0, true)
})

after(async () => {
    await mongoose.connection.close()
})