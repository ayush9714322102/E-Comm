import productModel from "../models/uploadProductModel.js";
import uploadProductPermission from "../helpers/permission.js";

async function updateProductController(req, res) {
    try {
        const isAdmin = await uploadProductPermission(req.userId);

        if (!isAdmin) {
            throw new Error("Permission Denied");
        }

        const {_id, ...resBody} = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

        res.json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export default updateProductController;