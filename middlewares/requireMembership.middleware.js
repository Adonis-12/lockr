const pool = require("../db")
const AppError = require("../utils/errorHandler")

async function requireMembership(req,res,next){
    const user_id = req.user.id 
    const tenant_id = req.tenant.id
    const result = await pool.query(
        `SELECT 1 FROM memberships WHERE tenant_id = $1 AND user_id = $2`,
        [tenant_id,user_id]
    )
    if(!result.rowCount){
        throw new AppError(401,"USER_UNAUTHORIZED")
    }
    console.log('here2')
    next()
}

module.exports = {
    requireMembership
}