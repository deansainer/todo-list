const pool = require('../db')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

class TodosController {
    
    async getTodos(req, res) {
        try {
            const todos = await pool.query("select * from todos")
            res.json(todos.rows)
        } catch (error) {
            console.error(error)
        }
    }
    
    async getTodoById(req, res) {
        const {id} = req.params
        try {
            const todos = await pool.query("select * from todos where id = $1", [id])
            res.json(todos.rows)
        } catch (error) {
            console.error(error)
        }
    }

    async createTodo(req, res) {
        const {email, title, progress, date} = req.body;
        const id = uuidv4();
        try {
            const todo = pool.query("insert into todos (id, email, title, progress, date) values($1, $2, $3, $4, $5)", [id, email, title, progress, date])
            res.json(todo)
        } catch (error) {
            console.error(error)
        }
    }
    
    async deleteTodo(req, res) {
        try {
            const {id} = req.params
            const todo = pool.query('delete from todos where id=$1', [id])
            res.json(todo)
        } catch (error) {
            console.error(error)
        }
    }
    
    async editTodo(req, res) {
        const {email, title, progress, date} = req.body;
        const {id} = req.params;
        try {
            const editedTodo = await pool.query('update todos set email=$1, title=$2, progress=$3, date=$4 where id=$5;', [email, title, progress, date, id])
            res.json(editedTodo.rows[0])
        } catch (error) {
            console.error(error);
        }
    }

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
                    res.json({'email': user.rows[0].email, token})
                } else {
                    res.json({detail: 'Login failed'})
                }
            }
            
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = new TodosController();