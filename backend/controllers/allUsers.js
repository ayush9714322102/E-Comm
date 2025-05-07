import userModel from "../models/userSignUpModel.js";
async function allUsers(req, res) {
    try {
      console.log("allUsers", req.userId);
  
      const allUsers = await userModel.find();
  
      res.json({
        message: "All users",
        data: allUsers,
        success: true,
        error: false
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }
  
  export default allUsers;
  