const _ = require('lodash')

const dummy =(blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return 0
    }
    const result = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })

    return result;
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) {
        return 0
    }

    const result = blogs.map(blog => blog.author)

    let result2 = _.countBy(result)

    result2 = Object.entries(result2).reduce((prev, current) => {
        return prev[1] > current[1] ? prev : current
    })


    return {author:result2[0], blogs:result2[1]}
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}