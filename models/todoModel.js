const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({

    todo:{
        type: String,
        required: [true, 'Please enter a todo']

    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a user id']  
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('Todo', todoSchema);