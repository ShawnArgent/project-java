const mongoose = require("mongoose");

const { Schema } = mongoose;
const Coffee = require("./Coffee");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
