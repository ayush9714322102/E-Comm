import express from "express";
import authToken from "../middleware/authToken.js";
import addToCartController from "../controllers/addToCartController.js";

const router = express.Router();

router.post("/addtocart", authToken, addToCartController);

export default router;