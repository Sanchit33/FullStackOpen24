const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    res.status(200).json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async(req, res, next) => {
    const {title, author, url, likes} = req.body

    const user = req.user

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

blogRouter.put(`/:id`, middleware.userExtractor, async(req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true}).populate('user', {username:1, name:1})
    res.json(updatedBlog)
})

blogRouter.delete(`/:id`, middleware.userExtractor, async(req, res) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)

    if(!blog){
        res.status(404).json({error: 'blog not found'})
    }

    if(blog.user.toString() !== user.id){
        res.status(403).json({error: 'forbidden'})
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end()
})

module.exports = blogRouter