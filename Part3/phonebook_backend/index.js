const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const person = require('./models/person')

const app = express()

// app.use(morgan('combined'))
app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

morgan.token('data', (req,res) => {return JSON.stringify(req.body)})

app.use(morgan(':method :url :response-time :data'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())


app.get('/api/persons', (req, res) => {
    person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req,res) =>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p><br/>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
   person.findById(req.params.id).then(person => {
       res.json(person)
   })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    // if (persons.find(person => person.name === body.name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
    const newPerson = new person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)