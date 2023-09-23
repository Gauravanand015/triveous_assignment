const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      name: String,
      price: String,
      description: String,
      quantity: { type: Number, default: 0 },
    },
  ],

  totalQuantity: { type: Number, default: 0 },

  totalPrice: { type: Number, default: 0 },
});

const CartModel = mongoose.model("Carts", cartSchema);

module.exports = { CartModel };
