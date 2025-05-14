  import dotenv from "dotenv";

  dotenv.config();

  import express from "express";
  import cors from "cors";
  import cookieParser from "cookie-parser";
  import connectDB from "./config/database.js";
  import userSignUpRouter from "./routes/userSignUpRoutes.js";
  import userSignInRouter from "./routes/userSignInRoutes.js";
  import userDetailsRouter from "./routes/userDetailsRoutes.js";
  import userLogout from "./controllers/userLogout.js";
  import userAllRouter from "./routes/allUsersRoutes.js";
  import userUpdateRouter from "./routes/updateUserRoutes.js";
  import uploadProductRouter from "./routes/uploadProductRoutes.js"; 
  import getProductRouter from "./routes/getProductRoutes.js"; 
  import updateProduct from "./routes/updateProductRoutes.js";
  import getCatagoryProductRouter from "./routes/getCatagoryProductRoutes.js";
  import getCategoryWiseProduct from "./routes/getCategoryWiseProduct.js";
  import getProductDetailRoutes from "./routes/getProductDetailRoutes.js"; 
  import addToCart from "./routes/addToCartRoutes.js";
  import countAddTocart from "./routes/countAddToCartRoutes.js";
  import addToCartViewProductRoutes from "./routes/addToCartViewProductRoutes.js";
  import updateAddToCartRoutes from "./routes/updateAddToCartRoutes.js";
  import deleteAddToCartProduct from "./routes/deleteAddToCartRoutes.js";
  import PaymentRoutes from './routes/orderRoutes/orderRoutes.js'
  import orderRoutes from './routes/orderRoutes/orderRoutes.js'
  import wishlist from "./routes/wishListRoutes.js";

  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  }));

  app.use(express.json());
  app.use(cookieParser());

  app.use("/user", userSignUpRouter);
  app.use("/login", userSignInRouter);
  app.use("/user", userDetailsRouter); 
  app.use("/user", userLogout); 

  // Admin Panel Routes
  app.use("/api", userAllRouter);
  app.use("/api", userUpdateRouter);

  // Product Routes
  app.use("/product",uploadProductRouter)
  app.use("/product", getProductRouter);
  app.use("/product", updateProduct);
  app.use("/product",getCatagoryProductRouter)
  app.use("/product",getCategoryWiseProduct)
  app.use("/product", getProductDetailRoutes) 

  // Add to cart Routes
  app.use("/product",addToCart)
  app.use("/product",countAddTocart)
  app.use("/product",addToCartViewProductRoutes)
  app.use("/product",updateAddToCartRoutes)
  app.use("/product",deleteAddToCartProduct)

  // Payment Routes
  app.use("/payment",PaymentRoutes)

  //order routes
  app.use("/order",orderRoutes)

  app.use("/wishlist",wishlist)

  connectDB().then(() => {
    app.listen(3000, () => {
      console.log("✅ Connected to DB");
      console.log("🚀 Server Running on http://localhost:3001");
    });
  });
