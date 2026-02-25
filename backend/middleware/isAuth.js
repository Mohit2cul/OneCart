import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    console.log("Auth check - Token exists:", !!token);
    
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT payload:', verifyToken);
    
    if (!verifyToken || !verifyToken.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    req.userId = verifyToken.userId;
    console.log('User ID set:', req.userId);
    next();
  } catch (error) {
    console.log("Error in authentication middleware:", error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: `Authentication error: ${error.message}` });
  }
};

export default isAuth;
