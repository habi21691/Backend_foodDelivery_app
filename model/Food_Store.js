const mongoose = require('mongoose');

const Food_table = new mongoose.Schema({
  catagories: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    requiered: true
  },
  image: {
    type: String,
    requiered: true
  },
  name:{
    type:String,
    requires:true
  }

})

const Blog = mongoose.model('Store', Food_table)
module.exports = Blog;