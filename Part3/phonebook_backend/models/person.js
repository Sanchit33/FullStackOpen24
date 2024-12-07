const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const persons = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true,
  },
  number: {
    type:String,
    minLength:9,
    validate:{
      validator:(value) => {
        return /\d{2}-\d{8}/.test(value)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required:true,
  },
})

persons.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('persons', persons)

