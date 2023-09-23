const express = require("express");
const { authentication } = require("../middleware/authentication");
const { CartModel } = require("../model/cartModel");
const { OrderModel } = require("../model/order.model");

const orderRouter = express();

orderRouter.post("/placeOrder", authentication, async (req, res) => {
  const { userId, email } = req.body;
  try {
    var userCartData = await CartModel.findOne({ user: userId });

    if (!userCartData) {
      return res.send("You have to add products to the cart first");
    }
    var { cart } = userCartData;
    if (cart.length !== 0) {
      const order = OrderModel({ user: userId, orderStatus: "placed" });
      const placedOrder = await order.save();
      res.send(placedOrder);
    } else {
      res.send("You have to add products to the cart before placing an order.");
    }
  } catch (error) {
    console.log(error);
    res.send("Error while placing an order");
  }
});

orderRouter.get("/orderDetails", authentication, async (req, res) => {
  const { userId, email } = req.body;

  const userCartData = await CartModel.findOne({ user: userId });
  if (userCartData.cart.length === 0) {
    return res.send("You have no orders");
  }
  res.send({ orderDetails: userCartData, orderStatus: "placed" });
});

module.exports = { orderRouter };
