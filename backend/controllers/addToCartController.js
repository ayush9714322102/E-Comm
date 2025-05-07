import addToCartModel from "../models/cartProduct.js";

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({ productId })

        if (isProductAvailable) {
            return res.json({
                message: "Product already in cart",
                error: true,
                success: false,
            })
        }

        const playload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const addToCart = await addToCartModel.create(playload)
        const savedProduct = await addToCart.save()

        res.json({
            message: "Product added to cart",
            error: false,
            success: true,
            data: savedProduct,
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
export default addToCartController;