const pool = require('../../db')
async function logout(req,res){
    const sessionId = req.cookies.session_id
    await logoutUser(sessionId)
    res.clearCookie('session_id',{
       httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(204)
}

module.exports = logout