const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const person = require('./models/person')

const app = express()

// app.use(morgan('combined'))
app.use(express.static('dist'))

app.use(cors())

app.use(express.json())
morgan.token('data', (req,res) => {return JSON.stringify(req.body)})

app.use(morgan(':method :url :response-time :data'))


let persons = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]



app.get('/api/persons', (req, res) => {
  person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req,res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br/>
    <p>${new Date()}</p>`)
})
app.get('/api/persons/:id', (req, res) => {
  person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  person.findByIdAndUpdate(req.params.id, { name, number }, { new:true, runValidators:true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()

    }).catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error:'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error:'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return res.status(400).send({ error:error.message })
  }
  next(error)
}

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)