import express from "express";
import authToken from "../middleware/authToken.js";
import userAllController from "../controllers/allUsers.js";

const router = express.Router();

router.get("/all-user", authToken, userAllController);

export default router;