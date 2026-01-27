const {loginUser} = require('../../services/auth.service')
async function login(req,res){
    const {email,password} = req.body
    const isLogin = await loginUser(email,password)
    return res.status(200).json({
        message : "USER_LOGGED_IN_SUCCESSFULLY"
    })
}
module.exports = {
    login
}