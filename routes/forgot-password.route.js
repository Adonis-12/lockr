const express = require('express')
const forgotPassword = require('../controllers/forgot-passsord.controller')
const ForgotPaswwordRouter= express.Router()

ForgotPaswwordRouter.get('/',forgotPassword)

module.exports = ForgotPaswwordRouter