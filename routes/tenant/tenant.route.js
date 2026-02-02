const express = require('express')
const { postTenant,getTenants, getTenantProfile } = require('../../controllers/tenant/tenant.controller')
const asyncHandler = require('../../utils/asyncHandler')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const { resolveTenant } = require('../../middlewares/resolveTenant.middleware')
const { requireMembership } = require('../../middlewares/requireMembership.middleware')
const TenantRouter = express.Router()
    
TenantRouter.post('/create',asyncHandler(authenticatedUsersOnly),asyncHandler(postTenant))
TenantRouter.get('/',asyncHandler(authenticatedUsersOnly),asyncHandler(getTenants))
TenantRouter.get('/:tenantId',asyncHandler(authenticatedUsersOnly),asyncHandler(resolveTenant),asyncHandler(requireMembership),asyncHandler(getTenantProfile))

module.exports = TenantRouter