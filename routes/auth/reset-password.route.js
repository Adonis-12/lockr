const express = require('express')
const {postResetRequest } = require('../../controllers/auth/reset-password.controller')
const asyncHandler = require('../../controllers/asyncHandler/asyncHandler')
const ResetPasswordRouter = express.Router()

ResetPasswordRouter.post('/',asyncHandler(postResetRequest))

module.exports = ResetPasswordRouter