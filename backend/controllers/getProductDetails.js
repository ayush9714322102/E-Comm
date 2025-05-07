import uploadProductModel from "../models/uploadProductModel.js";

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body

        const product = await uploadProductModel.findById(productId)

        res.json({
            message: "Product details fetched successfully",
            success: true,
            product: product,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            errgor: true,
            success: false
        });
    }
}

export default getProductDetails;