const TodosController = require("../controllers/TodosController");
const express = require('express')
const router = express.Router()

router.get('/todos', TodosController.getUsers)
router.get('/todos/:id', TodosController.getUserById)

module.exports = router;