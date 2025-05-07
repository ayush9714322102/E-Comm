import cartModel from '../models/cartProduct.js'

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await cartModel.deleteOne({_id : addToCartProductId,userId: currentUserId})

        res.json({
            message: "Product deleted from cart",
            success: true,
            error: false,
            data: deleteProduct,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error?.message || error,
            error: true,
        })
    }
}

export default deleteAddToCartProduct;