const pool = require('../db')
const AppError = require('../utils/errorHandler')
async function resolveTenant(req,res,next){
    const {tenantId} = req.params
    const result = await pool.query(
        'SELECT tenant_id FROM tenants WHERE id = $1',
        [tenantId]
    )
    if(!result.rowCount){
        throw new AppError(404,'TENANT_NOT_FOUND')
    }
    req.tenant = {
        id : tenantId
    }
    next()
}

module.exports = {
    resolveTenant
}