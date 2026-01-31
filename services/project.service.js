const pool = require('../db')
async function getAllProjects(tenant_id){
    const result = await pool.query(
        `SELECT name,description,created_by FROM projects WHERE tenant_id = $1`,
        [tenant_id]
    )
    const projects = result.rowCount? result.rows : []
    return projects
}

module.exports = {
    getAllProjects
}