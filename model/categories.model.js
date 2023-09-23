const mongoose= require("mongoose");


const categorySchema = mongoose.Schema({
    title:String,
    imageUrl:String
})

const CategoryModel = new mongoose.model("categories",categorySchema);


module.exports = {CategoryModel}