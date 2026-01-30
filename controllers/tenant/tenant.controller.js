const pool = require('../../db')
const { getAllTenants, createTenant } = require('../../services/tenant.service')

async function getTenants(req,res){
   const {user_id} = req.body
   const tenants =  getAllTenants(user_id)
   return res.status(200).json({
     tenants : tenants
   })
}

async function postTenant(req,res){
    const {user_id,tenant_name} = req.body
    await createTenant(user_id,tenant_name)
    return res.status(201).json({
        message  : "TENANT_CREATED_SUCCESSFULLY"
    })
}

module.exports = {
    getAllTenants,
    createTenant
}