import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Admin Auth - Decoded token:", decoded);
        
        if (!decoded || decoded.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized - Admin access required" });
        }
        req.adminEmail = decoded.adminEmail;
        next();
    } catch (error) {
        console.log("Admin Auth Error:", error.message);
        return res.status(500).json({ message: "Admin auth error: " + error.message });
    }
};

export default adminAuth;
