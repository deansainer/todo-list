const TodosController = require("../controllers/TodosController");
const express = require('express')
const router = express.Router()

router.get('/todos', TodosController.getTodos)
router.get('/todos/:id', TodosController.getTodoById)
router.post('/todos', TodosController.createTodo)
router.delete('/todos/:id', TodosController.deleteTodo)
router.put('/todos/:id', TodosController.editTodo)


module.exports = router;