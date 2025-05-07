import mongoose from "mongoose";

const uploadProductSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    productImage: [],
    productCategory: String,
    sellingPrice: Number,
},{
    timestamps: true,
})

export default mongoose.model("Product", uploadProductSchema);