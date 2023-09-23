const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
   
        name: String, imageUrl: String, 
        price: String,
        description: String,
        title: String,
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
})


const productModel = new mongoose.model("products", productSchema);


module.exports = { productModel }