const express = require('express')
const logout = require('../controllers/logout.controller')
const LogoutRouter = express.Router()

LogoutRouter.post('/',logout)

module.exports = LogoutRouter