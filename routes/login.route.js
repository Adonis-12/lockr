const express = require('express')
const LoginRouter = express.Router()
const asyncHandler = require('../controllers/asyncHandler')
const {getloginForm,login }= require('../controllers/login.controller')
const validateInput = require('../middlewares/validateInput.middleware')
const { guestUsersOnly } = require('../middlewares/authenticateUser.middleware')

LoginRouter.get('/',asyncHandler(guestUsersOnly),getloginForm)
LoginRouter.post('/',validateInput,asyncHandler(login))
module.exports = LoginRouter