import userSigninController from "../controllers/userSignin.js";
import express from 'express';

const router = express.Router();

router.post("/signin", userSigninController.signin);

export default router;