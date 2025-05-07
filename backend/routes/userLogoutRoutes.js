import userLogoutController from "../controllers/userLogout.js";
import express from 'express';

const router = express.Router();

router.get("/user-Logout", userSigninController.signin);

export default userLogoutController;