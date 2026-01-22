const express = require('express')
const resetRequest = require('../controllers/reset-request.controller')
const asyncHandler = require('../controllers/asyncHandler')
const resetRequestRouter = express.Router()

resetRequestRouter.post('/',asyncHandler(resetRequest))
module.exports = resetRequestRouter