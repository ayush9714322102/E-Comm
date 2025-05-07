async function userLogout(req, res) {
    try {
        res.clearCookie("token")
        res.json({
            message: "User Logout successfully",
            success: true,
            error: false,
            data : []
        });
    } catch (err) {
        console.log("Login Error:", err);
        res.status(409).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

export default userLogout;