const mongoose = require("mongoose");

const { Schema } = mongoose;
const Location = require("./Location");

const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  roast: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  tatsingProfile: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  locationHistory: {
    type: String,
    required: true,
    trim: true,
  },
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
