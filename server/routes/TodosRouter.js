const TodosController = require("../controllers/TodosController");
const UserController = require('../controllers/UsersController')

const express = require('express')
const router = express.Router()

router.get('/todos', TodosController.getTodos)
router.get('/todos/:id', TodosController.getTodoById)
router.post('/todos', TodosController.createTodo)
router.delete('/todos/:id', TodosController.deleteTodo)
router.put('/todos/:id', TodosController.editTodo)
router.get('/users', UserController.getUsers)
router.post('/users/signup', UserController.signUp)
router.post('/users/login', UserController.logIn)
router.get('/todos', TodosController.getTodos)


module.exports = router;