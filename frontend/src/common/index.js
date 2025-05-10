const backendDomin = "http://localhost:3000"

const SummaryApi = {
    SignUp: {
        url: `${backendDomin}/user/signup`,
        method: "post",
    },
    SingIn: {
        url: `${backendDomin}/login/signin`,
        method: "post"
    },
    Current_user: {
        url: `${backendDomin}/user/user-Details`,
        method: "get",
    },
    Logout_user: {
        url: `${backendDomin}/user/user-Logout`,
        method: "get",
    },
    All_user: {
        url: `${backendDomin}/api/all-user`,
        method: "get",
    },
    updateUser: {
        url: `http://localhost:3000/api/update-user`,
        method: "post",
    },
    uploadproduct: {
        url: `${backendDomin}/product/upload-product`,
        method: "post",
    },
    getAllProduct: {
        url: `${backendDomin}/product/get-product`,
        method: "get",
    },
    updateProduct: {
        url: `${backendDomin}/product/update-product`,
        method: "post",
    },
    catagoryproduct: {
        url: `${backendDomin}/product/get-catagoryproduct`,
        method: "get",
    },
    categorywiseproduct: {
        url: `${backendDomin}/product/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomin}/product/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomin}/product/addtocart`,
        method: "post",
    },
    countAddToCart: {
        url: `${backendDomin}/product/countAddtocart`,
        method: "get",
    },
    addToCartViewProduct: {
        url: `${backendDomin}/product/view-card-product`,
        method: "get",
    },
    updateAddToCartProduct: {
        url: `${backendDomin}/product/update-card-product`,
        method: "post",
    },
    deleteAddToCartProduct: {
        url: `${backendDomin}/product/delete-card-product`,
        method: "post",
    },
    SearchProduct: {
        url: `${backendDomin}/product/search`,
        method: "get",
    },
    filterProduct: {
        url: `${backendDomin}/product/filter-product`,
        method: "post"
    },
    createOrder: {
        url: `${backendDomin}/payment/createOrder`,
        method: "post"
    },
    verifyPayment: {
        url: `${backendDomin}/payment/verifyPayment`,
        method: "post"
    },
    getOrder: {
        url: `${backendDomin}/order/getOrder`,
        method: "get"
    },
    cancelOrder: { url: (id) => `${backendDomin}/order/cancelOrder/${id}`, method: "PUT" },
    deleteOrder: { url: (id) => `${backendDomin}/order/deleteOrder/${id}`, method: "DELETE" },
    getAllOrders: {
        url: `${backendDomin}/order/getAllOrders`,
        method: "get"
    },
    updateOrder: {
        url: `${backendDomin}/order/updateOrder`,
        method: "put"
    },
    orderDetails : {
        url: `${backendDomin}/order/create`,
        method: "post"
    }
}

export default SummaryApi;