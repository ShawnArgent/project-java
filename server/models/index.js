// Exports every other js module in the models folder.
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');

module.exports = { User, Product, Category, Order };

const fs = require('fs');

const modelEntries = fs
  .readdirSync(__dirname)
  .filter((filename) => /.js$/.test(filename))
  .map((filename) => [filename.replace(/.js$/, ''), require(`./${filename}`)]);

module.exports = Object.fromEntries(modelEntries);
