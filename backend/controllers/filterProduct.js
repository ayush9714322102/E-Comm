import ProductModel from "../models/uploadProductModel.js";

const filterProductController = async (req, res) => {
    try {
        const categoryList = Array.isArray(req.body.category)
            ? req.body.category
            : [];

        const sortOption = req.body.sort || "";

        let sortQuery = {};
        if (sortOption === "lowToHigh") {
            sortQuery = { sellingPrice: 1 };
        } else if (sortOption === "highToLow") {
            sortQuery = { sellingPrice: -1 };
        }

        const products = await ProductModel.find({
            productCategory: { $in: categoryList },
        }).sort(sortQuery);

        res.json({
            data: products,
            message: "Product found successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        });
    }
};

export default filterProductController;
