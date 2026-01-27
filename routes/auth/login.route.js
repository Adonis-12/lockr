const express = require('express')
const LoginRouter = express.Router()
const asyncHandler = require('../../utils/asyncHandler')
const {login }= require('../../controllers/auth/login.controller')
const validateInput = require('../../middlewares/validateInput.middleware')

LoginRouter.post('/',validateInput,asyncHandler(login))
module.exports = LoginRouter