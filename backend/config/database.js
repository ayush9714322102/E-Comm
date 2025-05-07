import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      // "mongodb+srv://ayushsavaliya4544:QpdsDEUCNl2xnm3e@riyaasat.ff3hft1.mongodb.net/"
      "mongodb+srv://ayushsavaliya4544:QpdsDEUCNl2xnm3e@riyaasat.ff3hft1.mongodb.net/Riyaasat?retryWrites=true&w=majority&appName=Riyaasat"
    );
    console.log("MongoDB connected to Riyaasat database");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;
