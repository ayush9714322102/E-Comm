import jwt from "jsonwebtoken";

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err || !decoded) {
        return res.status(401).json({
          message: "Invalid Token",
          error: true,
          success: false
        });
      }

      console.log("Decoded:", decoded);
      req.userId = decoded;
      next();
    });

  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false
    });
  }
}

export default authToken;
