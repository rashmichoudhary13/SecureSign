import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message: 'user not found.'})
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                role: user.role,
                isAccountVerified: user.isAccountVerified,
            }})

    }catch(err){
        return res.json({success: false, message: err.message})
    }
}