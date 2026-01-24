const express = require('express')
const router = express.Router()
const authRouter = require('./auth/index')
const tenantsRouter = require('./tenant/index')

router.use('/auth',authRouter)
router.use('/tenants',tenantsRouter)

module.exports = router