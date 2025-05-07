import userSignUpModel from "../models/userSignUpModel.js"

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId

        const {userId,email,role,name} = req.body

        const playload = {
            ...(email && {email : email}),
            ...(role && {role : role}),
            ...(name && {name : name})
        }

        const user = await userSignUpModel.findById(sessionUser)

        console.log("user.Role",user.role);
        

        const updateUser = await userSignUpModel.findByIdAndUpdate(userId,playload,{new:true})

        res.status(200).json({
            message: "User updated successfully",
            data: updateUser,
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
export default updateUser;