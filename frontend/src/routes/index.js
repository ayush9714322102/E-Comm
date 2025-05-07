import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import NewArrival from "../categorypages/NewArrival";
import BestSeller from "../categorypages/BestSeller";
import WomenSaree from "../categorypages/WomenSaree";
import WomenSalwar from "../categorypages/WomenSalwar";
import WomenLehngaCholi from "../categorypages/WomenLehngaCholi";
import WomenGown from "../categorypages/WomenGown";
import WomenBridal from "../categorypages/WomenBridal";
import MenKurta from "../categorypages/MenKurta";
import MenKoti from "../categorypages/MenKoti";
import MenSherwani from "../categorypages/MenSherwani";
import MenTuxedo from "../categorypages/MenTuxedo";
import MenIndoWestern from "../categorypages/MenIndoWestern";
import MenGroom from "../categorypages/MenGroom";
import WeddingGuest from "../categorypages/WeddingGuest";
import Haldi from "../categorypages/Haldi";
import Mehendi from "../categorypages/Mehendi";
import Reception from "../categorypages/Reception";
import UtsavCollection from "../categorypages/UtsavCollection";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <Signup />
            },
            {
                path: "/productcategory",  // Handle the case where there is no categoryName
                element: <CategoryProducts />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "new-arrivals",
                element: <NewArrival />
            },
            {
                path: "best-sellers",
                element: <BestSeller />
            },
            {
                path: "womens-wear/sarees",
                element: <WomenSaree />
            },
            {
                path: "womens-wear/salwar-suits",
                element: <WomenSalwar />
            },
            {
                path: "womens-wear/lehenga-cholis",
                element: <WomenLehngaCholi />
            },
            {
                path: "womens-wear/gowns",
                element: <WomenGown />
            },
            {
                path: "womens-wear/bridal-lehenga",
                element: <WomenBridal />
            },
            {
                path: "mens-wear/kurta-set",
                element: <MenKurta />
            },
            {
                path: "mens-wear/koti-set",
                element: <MenKoti />
            },
            {
                path: "mens-wear/sherwani",
                element: <MenSherwani />
            },
            {
                path: "mens-wear/tuxedo-set",
                element: <MenTuxedo />
            },
            {
                path: "mens-wear/indo-western",
                element: <MenIndoWestern />
            },
            {
                path: "mens-wear/groom-wear",
                element: <MenGroom />
            },
            {
                path: "wedding-guest-edit",
                element: <WeddingGuest />
            },
            {
                path: "haldi",
                element: <Haldi />
            },
            {
                path: "mehendi",
                element: <Mehendi />
            },
            {
                path: "reception",
                element: <Reception />
            },
            {
                path: "shop-by-collection",
                element: <UtsavCollection />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-product",
                        element: <AllProducts />
                    },
                ]
            }
        ]
    }
])
export default router;