import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
    }
  ],
  paymentId: { type: String },
  orderId: { type: String },
  signature: { type: String },
  status: { type: String, default: "Pending" },
  deliveryInfo: {
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String },
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("orders", orderSchema);
