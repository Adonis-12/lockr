const express = require('express')
const RegisterRouter = express.Router()
const {getRegisterForm,registerUser} = require('../controllers/register.controller')
const validateUser = require('../middlewares/validateInput.middleware')
const asyncHandler = require('../controllers/asyncHandler')
const { guestUsersOnly } = require('../middlewares/authenticateUser.middleware')

RegisterRouter.get('/',asyncHandler(guestUsersOnly),getRegisterForm)
RegisterRouter.post('/',validateUser,asyncHandler(registerUser))

module.exports = RegisterRouter