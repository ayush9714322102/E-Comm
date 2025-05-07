import userSignUpModel from "../models/userSignUpModel.js"

const uploadProductPermission = async (userId) => {
    const user = await userSignUpModel.findById(userId)
    if (!user || user.role !== "ADMIN") {
        return false;
    }
    
    return true; // User is an admin
}
export default uploadProductPermission;