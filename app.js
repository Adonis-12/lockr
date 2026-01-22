const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8000
const morgan = require('morgan')
const {registerUser} = require('./controllers/register.controller')
app.use(express.json())
app.use(morgan('combined'))
app.post('/api/users/register',registerUser)
app.listen(PORT, () =>{
    console.log(`Server is running on port number ${PORT}`)
})