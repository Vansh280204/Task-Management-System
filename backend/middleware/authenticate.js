const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message: "Authentication token is required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not configured");
        }

        const user = await User.findById(decoded.sub);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            });
        }
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive"
            });
        }
        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            isActive: user.isActive
        };
        next();
    }catch(error){
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Authentication failed"
    });
    }
};

module.exports = authenticate;