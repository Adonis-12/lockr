const pool = require("../db");
const TenantService = require("./tenant.service");

async function builduserProfile(user_id){
    const tenants = await TenantService.getAllTenants(user_id)
    const result = await pool.query(
        `SELECT name,email FROM users WHERE user_id = $1`,
        [user_id]
    )
    const user = result.rows[0]
    return {user,tenants}
}

module.exports = {
    builduserProfile
}