const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderStatus:{type:String,enum:["pending","placed"],default:"pending"},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})



const OrderModel = mongoose.model("orders",orderSchema)


module.exports = {OrderModel}