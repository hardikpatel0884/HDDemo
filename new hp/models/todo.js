const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, //validator
        minlength: 2, // minimum length
        trim: true //trim string
    },
    completed: {
        type: Boolean,
        default: false // set default value
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = { Todo };