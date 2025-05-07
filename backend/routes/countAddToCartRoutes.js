import express from "express";
import authToken from "../middleware/authToken.js";
import countAddTocart from "../controllers/countAddTocart.js";

const router = express.Router();

router.get("/countAddtocart", authToken, countAddTocart);

export default router;