const express = require('express')
const logout = require('../../controllers/auth/logout.controller')
const asyncHandler = require('../../utils/asyncHandler')
const LogoutRouter = express.Router()

LogoutRouter.post('/',asyncHandler(logout))

module.exports = LogoutRouter