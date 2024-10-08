const express = require('express')
const morgan = require('morgan')

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
    res.json(persons)
})

app.get('/info', (req,res) =>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p><br/>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id:(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)