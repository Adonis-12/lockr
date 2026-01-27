const pool = require('../../db')
async function logout(req,res){
    const sessionId = req.cookies.session_id
    await logoutUser(sessionId)
    return res.status(204)
}

module.exports = logout