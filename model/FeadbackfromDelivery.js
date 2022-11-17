
const mongoose = require('mongoose')

const feadback = new mongoose.Schema({
    customername:{
        type: String,
        required: true
    },
    address:{
        type: String,
        require: true
    },
    phonenumber:{
        type: Number,
        require: true
    },
    status:{
        type: String,
        require: true
    }
})

const Blog = mongoose.model('Feadback',feadback)
module.exports=Blog;