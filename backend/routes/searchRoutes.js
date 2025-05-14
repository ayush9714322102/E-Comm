import express from 'express'
import tokenAuthentication from "../middleware/authToken.js";
import AddProduct from "../controllers/uploadProduct.js"
import getProduct from '../controllers/getProduct.js';
import update from '../controllers/updateProduct.js';
import getCategoryProduct from '../controllers/getProduct.js';
import getCategoryWiseProducts from '../controllers/getCategoryWiseProduct.js';
import getProductById from '../controllers/getCatagoryProductOne.js';
import SearchProduct from '../controllers/searchController.js';
import filterProductController from '../controllers/filterProduct.js';

const router = express.Router()
router.use(express.json())

router.post("/create",tokenAuthentication,AddProduct)
router.get("/get",getProduct)
router.post("/update",tokenAuthentication,update)
router.get("/getCategoryProduct",getCategoryProduct)
router.post("/getCategoryWiseProducts",getCategoryWiseProducts)
router.get("/productdetails/:id",getProductById)
router.get("/search",SearchProduct)
router.post("/filter",filterProductController)

export default router