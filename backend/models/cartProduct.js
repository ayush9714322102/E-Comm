import mongoose from "mongoose";
import { type } from "os";

const addToCart = new mongoose.Schema({
    productId : {
        ref:"Product",
        type: String,
    },
    quantity : Number,
    userId : String,
},{
    timestamps: true,
})

export default mongoose.model("addToCart",addToCart);