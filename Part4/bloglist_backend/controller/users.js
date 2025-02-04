const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const {username, author, password} = req.body

    const saltRounds = 10
    console.log(password)
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        author,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter