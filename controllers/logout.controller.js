const pool = require('../db')
async function logout(req,res){
    const sessionId = req.cookies.session_id
    await pool.query(
        `DELETE FROM sessions WHERE session_id = $1`,
        [sessionId]
    )
    res.clearCookie('session_id',{
       httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.redirect('/')
}

module.exports = logout