import express from "express";
import { createOrder,verifyPayment } from "../../controllers/razorpayPayment.js";
import tokenAuthentication from "../../middleware/authToken.js";
import { cancelOrder, deleteOrder, getAllOrders, getLatestOrder, updateOrder } from "../../controllers/orders/getAllOrderController.js";
import createOrderDetails from "../../controllers/orders/orderFormController.js";

const router = express.Router();


router.post('/create',tokenAuthentication, createOrderDetails);
router.post("/createOrder",tokenAuthentication, createOrder);
router.post("/verifyPayment",tokenAuthentication, verifyPayment);
router.get("/getOrder",tokenAuthentication, getLatestOrder);
router.put("/cancelOrder/:id",tokenAuthentication, cancelOrder);
router.get("/getAllOrders",tokenAuthentication, getAllOrders);
router.put("/updateOrder/:id",tokenAuthentication, updateOrder);
router.delete("/deleteOrder/:id",tokenAuthentication, deleteOrder)

export default router;