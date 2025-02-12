const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    res.status(200).json(blogs)
})

blogRouter.post('/', async(req, res, next) => {
    const {title, author, url, likes, userId} = req.body

    const user = await User.findById(userId)

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogRouter.put(`/:id`, async(req, res) => {
    const body = req.body

    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updatedBlog)
})

blogRouter.delete(`/:id`, async(req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end()
})

module.exports = blogRouter