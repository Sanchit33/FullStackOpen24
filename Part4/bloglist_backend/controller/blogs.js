const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})

blogRouter.post('/', async(req, res, next) => {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
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