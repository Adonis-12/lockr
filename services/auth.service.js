const bcrypt = require('bcrypt')
const crypto = require('crypto')
const pool = require('../db')
const AppError = require('../utils/errorHandler')


async function registerUser(name,email,password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)// hashing password
    try{
        await pool.query(
        'INSERT INTO users(name,email,password_hash,user_role) VALUES ($1,$2,$3,user)',
        [name,email,hash]
    )   
        return 
    }catch(err){
        if(err.code == "23505"){
            throw new AppError("USER_ALREADY_EXIST",301)
        }
    }
}

async function loginUser(email,password){
     const result = await pool.query(
        'SELECT id,password_hash FROM users WHERE email = $1',
        [email]
    )
    if(!result.rowCount){
        throw new AppError("USER_DOES_NOT_EXIST",404)
    }
    const user_id = result.rows[0].id
    const hash = result.rows[0].password_hash
    const matched = await bcrypt.compare(
        password,
        hash
    )
    if(matched === true){
       const session_id =crypto.randomBytes(32).toString('hex') // random session string
       try{
           await pool.query(
            `INSERT INTO sessions(user_id,session_id,expires_at) VALUES ($1,$2,NOW() + '7 days')`,
            [user_id,session_id]
           )
       }catch(err){
            if(err.code == "23505"){
                throw new AppError("SOMETHING_WENT_WRONG",500)
            }
       }
       return {session_id}
    }else{
        throw new AppError("WRONG_CREDENTIALS",403)
    }
}
async function logoutUser(sessionId){
    await pool.query(
        `DELETE FROM sessions WHERE session_id = $1`,
        [sessionId]
    )
    return 
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser
}

