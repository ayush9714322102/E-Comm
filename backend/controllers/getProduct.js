import uploadProductModel from "../models/uploadProductModel.js";

const getProductController = async (req, res) => {
    try {
        const allProducts = await uploadProductModel.find().sort({ createdAt: -1 });

        res.json({
            message: "All Products",
            data: allProducts,
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        }); 
    }
}

export default getProductController;