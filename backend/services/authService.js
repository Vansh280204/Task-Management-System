const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authService = {
    login: async (data) =>{
        const{email,password} = data;

        const user = await User.findOne({email:email.trim().toLowerCase()}).select("+passwordHash");

        if(!user){
            throw new Error("Invalid Email or Password");
        }

        if(!user.isActive){
            throw new Error("Your Account is Inactive");
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch){
            throw new Error("Password is Incorrect");
        }

        const token = jwt.sign(
            { sub: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn:process.env.JWT_EXPIRES_IN || "1d" }
        );
        return{
            success:true,
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone
            }
        };
    }
};

module.exports = authService;