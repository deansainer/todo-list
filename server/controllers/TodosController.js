const pool = require('../db')
const { v4: uuidv4 } = require('uuid');
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
}

module.exports = new TodosController();