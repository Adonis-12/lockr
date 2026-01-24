const pool = require('../../db')
const bcrypt = require('bcrypt')

async function registerUser(req,res){
    const {name,email,password} = req.body
    const exists = await pool.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
    )
    if(exists.rowCount > 0){
        return res.status(409).json({
            messsage : "User already exists"
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)// hashing password
    await pool.query(
        'INSERT INTO users(name,email,password_hash,user_role) VALUES ($1,$2,$3,user)',
        [name,email,hash]
    )
    return res.status(201).send("User registered successfully, please login to continue")
}

module.exports = {
    registerUser,
}