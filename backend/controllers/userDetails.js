import userModel from "../models/userSignUpModel.js";

async function userDetailsController(req, res) {
  try {
    console.log("User ID:", req.userId);

    const user = await userModel.findById(req.userId) // Hide password

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "User details fetched",
      success: true,
      error: false,
      data: user
    });

  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

export default userDetailsController;
