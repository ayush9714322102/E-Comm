import uploadProductModel from "../models/uploadProductModel.js";

const getCategoryWiseProduct = async (req,res) => {
    try {
        const {productCategory} = req?.body || req?.query
        const product = await uploadProductModel.find({productCategory})

        res.json({
            message: "product",
            data: product,
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            errgor: true,
            success: false
        });
    }
}

export default getCategoryWiseProduct;