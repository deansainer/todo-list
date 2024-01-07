const pool = require('../db')

class TodosController {
    
    async getUsers(req, res) {
        try {
            const todos = await pool.query("select * from todos")
            res.json(todos.rows)
        } catch (error) {
            console.error(error)
        }
    }
    
    async getUserById(req, res) {
        const {id} = req.params
        try {
            const todos = await pool.query("select * from todos where id = $1", [id])
            res.json(todos.rows)
        } catch (error) {
            console.error(error)
        }
    }
    
    
}

module.exports = new TodosController();