import express from "express";
import authToken from "../middleware/authToken.js";
import updateUserController from "../controllers/updateUser.js";

const router = express.Router();

router.post("/update-user", authToken, updateUserController);

export default router;