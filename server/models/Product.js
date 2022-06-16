const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
 
  quantity: {
    type: Number,
    min: 0,
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  tastingProfile: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  locationHistory: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    ref: 'Category',
    trim: true
  },

  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
