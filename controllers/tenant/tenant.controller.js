const pool = require('../../db')

async function getAllTenants(req,res){
    const user_id = req.user.id
    const result = await pool.query(
            `SELECT t.tenant_name
             FROM memberships m 
             JOIN tenants t ON 
             m.tenant_id = t.id
             WHERE m.user_id = $1`,
             [user_id]
        )
    if(!result.rowCount){
        return res.status(200).json({
           tenants : []
        })
    }
    const tenants = result.rows
    return res.status(200).json({
        tenants : tenants
    })
}

async function createTenant(req,res){
    const user_id = req.user.id 
    const tenantName = req.body.tenantName
    const client = await pool.connect()
    try{
        await client.query(`BEGIN`)
        const result =  await client.query(`INSERT INTO tenants(tenant_name) VALUES($1) RETURNING id`,[tenantName])
        const tenantId = result.rows[0].id
        await client.query(`INSERT INTO memberships(user_id,tenant_id,role) VALUES($1,$2,'owner')`,[user_id,tenantId])
        await client.query(`COMMIT`)
        return res.status(201).json({
            message : "Tenant creation successful"
        })
    }catch(err){
        console.log(err)
        await client.query(`ROLLBACK`)
        client.release()
        return res.status().json({
            message : "Failed to create the tenant"
        })
    }
    
}

module.exports = {
    getAllTenants,
    createTenant
}