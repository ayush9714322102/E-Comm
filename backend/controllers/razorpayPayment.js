import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import cartModel from "../models/cartProduct.js";
import orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        return res.json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, message: "Payment initiation failed" });
    }
};

// optional: to verify payment success after payment
export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const sign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (sign !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // ✅ Fetch all cart products of the user
        const cartItems = await cartModel.find({ userId: req.userId }).populate("productId");

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }

        // ✅ Convert cart items to order items format
        const items = cartItems.map(item => ({
            product: item.productId._id, // ✅ make sure this is a valid ObjectId
            quantity: item.quantity,
        }));

        const newOrder = new orderModel({
            user: req.userId,
            items,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            signature: razorpay_signature,
        });

        await newOrder.save();

        // ✅ Clear cart after order
        await cartModel.deleteMany({ userId: req.userId });

        res.json({ success: true, message: "Payment verified and order saved" });

    } catch (error) {
        console.error("Error in verifyPayment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


