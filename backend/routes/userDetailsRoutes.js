import express from "express";
import authToken from "../middleware/authToken.js";
import userDetailsController from "../controllers/userDetails.js";

const router = express.Router();

router.get("/user-Details", authToken, userDetailsController);

export default router;
