const express = require('express')
const { getResetRequest, postResetRequest } = require('../controllers/reset-password.controller')
const asyncHandler = require('../controllers/asyncHandler')
const ResetPasswordRouter = express.Router()

ResetPasswordRouter.get('/',getResetRequest)
ResetPasswordRouter.post('/',asyncHandler(postResetRequest))

module.exports = ResetPasswordRouter