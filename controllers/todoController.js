const Todo = require('../models/todoModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

 




const getTodos = async(req, res) => {
    

    const todo = await Todo.find({userId: req.user.id});
    res.status(200).json(todo);

res.status(200).json({
    message: 'Get all todos',
});

}

const setTodos = async(req, res) => {
try{


    if(!req.body.todo){
        res.status(400)
        throw new Error('Please enter a todo')

    }

    
    
    
    token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            
           
            
            const todo = await Todo.create({
        todo: req.body.todo,
        userId: req.user.id,
        completed: req.body.completed
        
    });

       res.status(200).json(todo); 
    }


    catch(e){
        console.log(e);
        res.status(401)
        throw new Error('Not authorized, token failed')
    }}

   






const updateTodos = async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    if(todo.userId.toString() !==  user.id){
        res.status(400)
        throw new Error('User not authorized')

    }


    const updatedTodo = await Todo.findByIdAndUpdate(
        id, req.body , {new : true} )



res.status(200).json(updatedTodo);


}


const updateComplete = async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    


    const updatedTodo = await Todo.findByIdAndUpdate(
        id, req.body , {new : true} )



res.status(200).json(updatedTodo);


}






const deleteTodos = async(req, res) => {
    const id = req.params.id
    const todo = await Todo.findById(id);

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    if(todo.userId.toString() !==  user.id){
        res.status(400)
        throw new Error('User not authorized')

    }

    await todo.remove();

res.status(200).json({id : req.params.id});

}
module.exports = {getTodos
, setTodos
, updateTodos
, deleteTodos,
updateComplete
}