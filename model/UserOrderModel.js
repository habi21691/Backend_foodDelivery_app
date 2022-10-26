const mongoose = require("mongoose");

const orderTable = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  deliver_boy: {
    type: String,
    required: false,
  },
   status:{
      type:String,
      default:'Pending...',
      required:true
    
  },
  name:{
      type: String,
      required:true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("User_Order_Table", orderTable);
module.exports = Blog;
