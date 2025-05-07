import userModel from "../models/userSignUpModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import loginHistoryModel from "../models/userSignInModel.js";

const userSigninController = {
  async signin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) throw new Error("Please Provide Email");
      if (!password) throw new Error("Please Provide Password");

      const user = await userModel.findOne({ email: email.toLowerCase() });

      if (!user) throw new Error("User not found");

      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };

        // ✅ JWT lifetime token (no expiration)
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);

        // ✅ Save login history with token
        const savedHistory = await loginHistoryModel.create({
          userId: user._id,
          email: user.email,
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          token: token, // ✅ Store token here
        });

        console.log("Login history saved:", savedHistory);

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        }).json({
          message: "User Login successfully",
          token,
          success: true,
          error: false,
        });
      } else {
        throw new Error("Please Check Your Password...");
      }

    } catch (err) {
      console.log("Login Error:", err);
      res.status(409).json({
        message: err.message,
        error: true,
        success: false,
      });
    }
  },
};

export default userSigninController;
