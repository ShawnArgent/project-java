const mongoose = require("mongoose");

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  frequency: {
    type: String,
    required: true,
    trim: true,
  },
  coffees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coffee",
    },
  ],
  lastOrderDate: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  lastOrderId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
