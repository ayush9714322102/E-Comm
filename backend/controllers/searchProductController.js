import ProductModel from "../models/uploadProductModel.js";

const SearchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        const regexp = new RegExp(query, 'i'); // 'i' is enough for case-insensitive

        const products = await ProductModel.find({
            $or: [
                { productCategory: regexp }
            ]
        });

        res.json({
            message: "Success",
            data: products,
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

export default SearchProduct;