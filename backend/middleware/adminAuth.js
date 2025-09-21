import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.adminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Admin auth error" });
    }
};

export default adminAuth;
