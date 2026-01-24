const express = require('express')
const logout = require('../../controllers/auth/logout.controller')
const LogoutRouter = express.Router()

LogoutRouter.post('/',logout)

module.exports = LogoutRouter