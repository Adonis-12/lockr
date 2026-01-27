const express = require('express')
const { createTenant,getAllTenants } = require('../../controllers/tenant/tenant.controller')
const asyncHandler = require('../../utils/asyncHandler')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const TenantRouter = express.Router()
    
TenantRouter.post('/create',asyncHandler(authenticatedUsersOnly),asyncHandler(createTenant))
TenantRouter.get('/',asyncHandler(authenticatedUsersOnly),asyncHandler(getAllTenants))

module.exports = TenantRouter