const pool = require('../db')

async function guestUsersOnly(req,res,next){
    if(!req.cookies || !req.cookies.session_id){
        console.log(1)
        return next()
    }
    const sessionId = req.cookies.session_id
    const result = await pool.query(
        `SELECT user_id FROM sessions WHERE session_id = $1 AND expires_at > NOW()`,
        [sessionId]
    )
    if(!result.rowCount){
        next()
    }
    const userId = result.rows[0].user_id
    return res.redirect(`/profile/${userId}`)
}

async function authenticatedUsersOnly(req,res,next){
    if(!req.cookies || !req.cookies.session_id){
            return res.redirect('/login')
    }
        const sessionCookie = req.cookies.session_id
        const result = await pool.query(
            `SELECT u.username FROM 
             users u 
             JOIN sessions s
             ON u.id = s.user_id
             WHERE session_id = $1
             AND expires_at > NOW()`,
            [sessionCookie]
        )
        if(!result.rowCount){
                return res.redirect('/login')
        }
        const username = result.rows[0].username
        req.user = {
            username : username,
        }
        next()
}   

module.exports = {
    guestUsersOnly,
    authenticatedUsersOnly
}