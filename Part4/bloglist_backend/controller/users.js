const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if(!password){
        res.status(400).json({error:'password is needed'})
    }

    if(password.length < 3){
        res.status(400).json({error:'password must be long'})
    }

    const saltRounds = 10
    console.log(password)
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) =>{
    const users = await User.find({})
    res.status(200).json(users)
})

module.exports = userRouter