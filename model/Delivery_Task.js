const mongoose = require('mongoose')
 
const Task = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
       type : Number,
       required : true
    },
    amount : {
        type : Number,
        required : true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Blog =mongoose.model('deliveryTask',Task )
module.exports=Blog