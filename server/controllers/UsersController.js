const pool = require('../db')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

class UserController {
    
    async getUsers(req, res){
        try {
            const users = await pool.query('select * from users;')
            res.json(users.rows)
        } catch (error) {
            console.error(error);
        }
    }

    // sign up
    async signUp(req, res) {
        const {email, password} = req.body;
            
            // hashing password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = await pool.query('insert into users (email, password) values ($1, $2);', [email, hashedPassword])

            // creating token
            const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})            
            res.json({email, token})
        } catch (error) {
            if (error){
                res.json({detail: error.detail})
            }
        }
    }

    // log in 
    async logIn(req, res){
        const {email, password} = req.body;
        try {
            const user = await pool.query('select * from users where email = $1', [email])
            if (!user.rows[0]){
                res.json({detail: 'User doesnt exist'})
            } else {
                const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})            
                const passwordMatch = await bcrypt.compare(password, user.rows[0].password)
                if (passwordMatch){
                    res.json({'email': user.rows[0].email, 'token': token})
                } else {
                    res.json({detail: 'Login failed'})
                }
            }
            
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = new UserController();