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

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return 0;
    }

    const authors = _.groupBy(blogs,'author')

    const result = Object.entries(authors).reduce((prev, current) => {
        return prev[1].reduce((prev2, current2) => {
            return prev2 + current2.likes
        },0) > current[1].reduce((prev2, current2) => {
            return prev2 + current2.likes
        },0) ? prev : current
    })

    return {author:result[0], likes:result[1].reduce((prev, current) => {
        return prev + current.likes
    },0)}
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}