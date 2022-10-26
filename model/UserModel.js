const mongoose = require('mongoose')

const UserTable = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    }
    ,
    phone_number: {
        type: Number,
        required:true
        
    },
    role: {
        type: String,
        default: 'User',
        required: true

    }



})

const Blog = mongoose.model('User_table', UserTable)
module.exports = Blog