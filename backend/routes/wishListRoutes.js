import express from "express";
import wishlistController from "../controllers/wishListController.js";
import verifyToken from "../middleware/authToken.js"; 
import WishlistCount from "../controllers/wishListCountController.js";

const router = express.Router();

router.post("/add", verifyToken, wishlistController.addToWishlist);
router.get("/get", verifyToken, wishlistController.getWishlist);
router.get("/getCount", verifyToken, WishlistCount)
router.delete("/delete/:productId", verifyToken, wishlistController.deleteProduct);

export default router;