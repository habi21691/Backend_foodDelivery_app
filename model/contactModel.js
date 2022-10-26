const mongoose = require('mongoose')

const conTable = new mongoose.Schema({
    name: {
            type : String,
            required : true,
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required  : true
    }
})

const Blog = mongoose.model('ContactModel' , conTable)
module.exports= Blog;