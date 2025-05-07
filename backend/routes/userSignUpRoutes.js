import express from "express";
import userSignUpController from "../controllers/userSignUp.js";
const router = express.Router()



router.post("/signup",userSignUpController.signup)

export default router;