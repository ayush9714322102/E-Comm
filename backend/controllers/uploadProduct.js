import uploadProductModel from "../models/uploadProductModel.js";
import uploadProductPermission from "../helpers/permission.js";



async function uploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;
        const isAdmin = await uploadProductPermission(sessionUserId);

        if (!isAdmin) {
            throw new Error("Permission Denied");
        }

        const uploadProduct = new uploadProductModel(req.body);
        const savedProduct = await uploadProduct.save();
        res.status(200).json({
            message: "Product uploaded successfully",
            success: true,
            data: savedProduct,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export default uploadProductController;