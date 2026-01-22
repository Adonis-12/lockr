const bcrypt = require('bcrypt')
const crypto = require('crypto')
const pool = require('../db')

function getloginForm(req,res){
    return res.render("login")
}

async function login(req,res){
    const {email,password} = req.body
    
    const result = await pool.query(
        'SELECT id,username,password_hash FROM users WHERE email = $1',
        [email]
    )
    if(!result.rowCount){
        return res.status(400).json({
            message : "User does not exist"
        })
    }
    console.log(1)
    const user_id = result.rows[0].id
    const hash = result.rows[0].password_hash
    const matched = await bcrypt.compare(
        password,
        hash
    )
    console.log(2)
    if(matched === true){
       const session_id =crypto.randomBytes(32).toString('hex') // random session string
       console.log(3)
       await pool.query(
        `INSERT INTO sessions(user_id,session_id,expires_at) VALUES ($1,$2,NOW() + '7 days')`,
        [user_id,session_id]
       )
       console.log(4)
       res.cookie('session_id',session_id,{
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
       })
       res.redirect(`/profile`)
    }else{
        return res.status(400).json({
            message : "Wrong Credentials"
        })
    }

}
module.exports = {
    getloginForm,
    login
}