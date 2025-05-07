import mongoose from "mongoose";

const userSignInModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // ✅ Make sure your signup model is called "users"
    required: true,
  },
  email: { type: String, required: true },
  logintime: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  token: { type: String }, // ✅ Add this line to store JWT token
});

export default mongoose.model("loginHistory", userSignInModel);
