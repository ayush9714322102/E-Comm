import ProductModel from "../models/uploadProductModel.js";

const getCatagoryProduct = async (req,res)=>{
    try {
        const product = await ProductModel.distinct("productCategory")
        console.log("Catagory",product);

        const productByCatagory = []

        for(const catagory of product){
            const product = await ProductModel.findOne({ productCategory: catagory })

            if (product) {
                productByCatagory.push(product)
            }
        }

        res.json({
            message: "Catagory",
            data: productByCatagory,
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
export default getCatagoryProduct;