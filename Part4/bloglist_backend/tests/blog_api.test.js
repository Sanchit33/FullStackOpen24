const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.intialBlogs)
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

    describe('addition of new blog', () => {
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
        
            const res = await helper.blogsInDb()
        
            const contents = res.map(blog => blog.title)
        
            assert.strictEqual(res.length, helper.intialBlogs.length + 1)
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
        
            const res = await helper.blogsInDb()
            const recentBlog = res[helper.intialBlogs.length]
        
            assert(recentBlog.likes === 0, true)
        })
        
        test('blog without title is not added', async() => {
            const newBlog = {
                author: "Sanchit Shinde",
                url:"www.https//sanchitblogs.com",
                likes: 3,
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
            const res = await helper.blogsInDb()
        
            assert(res.length === helper.intialBlogs.length, true)
        
        })
        
        test('blog without url is not added', async() => {
            const newBlog = {
                title:"Type-Script",
                author: "Sanchit Shinde",
                likes: 3,
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
            const res = await helper.blogsInDb()
        
            assert(res.length === helper.intialBlogs.length, true)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async() => {
            const blogs = await helper.blogsInDb()
            const blogToDelete = blogs[0]

            await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            const content = blogsAtEnd.map(item => item.title)

            assert.strictEqual(blogsAtEnd.length, helper.intialBlogs.length -1);
            assert.strictEqual(!content.includes(blogToDelete.title), true)

        })
    })
})


test('the blog post has unique identifier property named as id', async() => {
    const res = await api.get('/api/blogs')

    assert("id" in res.body[0], true)
})




after(async () => {
    await mongoose.connection.close()
})