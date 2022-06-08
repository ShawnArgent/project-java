const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  frequency: {
    type: String,
    required: true,
    trim: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  coffees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coffee",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
