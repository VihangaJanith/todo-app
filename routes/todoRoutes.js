const express = require('express');
const router = express.Router();
const {getTodos, setTodos, updateTodos, deleteTodos, updateComplete} = require('../controllers/todoController');
const {auth} = require('../middleware/authMiddleware');

router.get('/', auth, getTodos);
router.post('/',  setTodos);
router.put('/:id', auth,updateTodos);
router.delete('/:id', auth, deleteTodos);

router.put('/done/:id' , updateComplete);

module.exports = router