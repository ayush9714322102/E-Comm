import addToCartModel from "../models/cartProduct.js";

const countAddTocart = async (req, res) => {
    try {
        const userId = req.userId;

        const count = await addToCartModel.countDocuments({
            userId: userId
        });

        res.json({
            data: {
                count: count,
            },
            message: "Count fetched successfully",
            error: false,
            success: true,
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export default countAddTocart;