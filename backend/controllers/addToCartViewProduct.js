import addToCartModel from "../models/cartProduct.js"

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId").populate("userId")

        res.json({
            message : "All products in cart",
            success : true,
            data : allProduct,
            error : false
        })
    } catch (error) {
        res.json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export default addToCartViewProduct