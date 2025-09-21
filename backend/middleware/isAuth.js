import e from "express";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if(!token){
        return res.status(400).json({message: "User does not have a token"});
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!verifyToken){
        return res.status(401).json({message: "Invalid token"});
    }
    req.userID = verifyToken.userID
    next();
  } catch (error) {
    console.log("Error in authentication middleware:", error);
    return res.status(500).json({ message: `isAuth middleware error: ${error}` });
  }
};

export default isAuth;
