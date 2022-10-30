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
  

})

const Blog = mongoose.model('Store', Food_table)
module.exports = Blog;