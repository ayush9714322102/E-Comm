import addToCartModel from "../models/cartProduct.js";

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        const updateProduct = await addToCartModel.findOneAndUpdate(
            {
                _id: addToCartProductId,
                userId: currentUserId
            },
            {
                quantity: qty
            },
            {
                new: true
            }
        );

        res.json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updateProduct
        });

    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};

export default updateAddToCartProduct;
