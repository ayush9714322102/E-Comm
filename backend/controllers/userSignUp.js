import userModel from "../models/userSignUpModel.js";

const userSignUpController = {
  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      const userExist = await userModel.findOne({ email });
      if (userExist) return res.status(409).json({ message: "User already exists" });

      const newUser = new userModel({ name, email, password, phone });
      await newUser.save();

      res.status(201).json({ message: "Signup success", success: true });

    } catch (error) {
      res.status(500).json({ message: "Signup failed", error: error.message });
    }
  }
};

export default userSignUpController;
