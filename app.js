const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const globalErrorHandler = require('./utils/globalErrorHandler')

app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/api/v1',routes)
app.get('/',(req,res) =>{
    return res.render("index",{
        base_url : process.env.BASE_URL
    })
})
app.use(globalErrorHandler)
app.listen(PORT,() => {
    console.log(`server is running on port number ${PORT}`)
})