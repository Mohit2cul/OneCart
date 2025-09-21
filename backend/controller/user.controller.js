import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userID).select("-password -__v");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getCurrentUser controller:", error);
        return res.status(500).json({ message: `getCurrentUser error: ${error}` });
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(400).json({message: "Admin email not found"});
        }
        return res.status(200).json({
            email: adminEmail,
            role: "admin"
        });
    } catch (error) {
        console.log("Error in getAdmin controller:", error);
        return res.status(500).json({ message: `getAdmin error: ${error}` });
    }
}