const TodosController = require("../controllers/TodosController");
const express = require('express')
const router = express.Router()

router.get('/todos', TodosController.getTodos)
router.get('/todos/:id', TodosController.getTodoById)
router.post('/todos', TodosController.createTodo)
router.delete('/todos/:id', TodosController.deleteTodo)
router.put('/todos/:id', TodosController.editTodo)
router.get('/users', TodosController.getUsers)
router.post('/users/signup', TodosController.signUp)
router.post('/users/login', TodosController.logIn)


module.exports = router;