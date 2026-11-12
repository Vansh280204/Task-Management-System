const userService = require("../services/userService");

//Create User
const createUser = async (req, res) => {
        try{
            const user = await userService.createUser(req.body);
            res.status(201).json({ 
                success:true,
                message: "User Registered Successfully",
                data:user
            });
        }catch(error){
            if (error.code === 11000) { // Mongo duplicate key
                return res.status(409).json({ success: false, message: "User already exists" });
            }
            if (error.name === "ValidationError") {
                return res.status(400).json({ success: false, message: error.message });
            }
            res.status(500).json({ 
                success:false,
                message: "Error Registering User", error: error.message 
            });
        }
};

//Get All User
const getAllUser = async (req, res) => {
    try{
        const user = await userService.getAllUser();
        res.status(200).json({
            success:true,
            message: "User Retrived Successfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Error Retriving User", error: error.message
        });
    }
};

//Get User's By Id
const getById = async (req,res) => {
    try{
        const user = await userService.getById(req.params.id);
        res.status(200).json({
            success:true,
            message: "User Retrived Successfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Error Retriving User", error: error.message
        });
    }
};

//Get by Name
const getByName = async (req,res) => {
    try{
        const user = await userService.getByName(req.params.name);
        res.status(200).json({
            success:true,
            message:"User Retrived Successfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error Retriving User", error: error.message
        });
    }
};

//Get By Email
const getByEmail = async (req,res) => {
    try{
        const user = await userService.getByEmail(req.params.email);
        res.status(200).json({
            success:true,
            message:"User Retrived Successfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error Retriving User", error: error.message
        });
    }
};

//Update by ID
const updateById = async (req, res) => {
    try{
        const user = await userService.updateById(req.params.id, req.body);
        res.status(200).json({
            success:true,
            message:"User Updated Successfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error While Updating User", error: error.message
        });
    }
};

//Change isActive By Id
const changeActiveById = async (req,res) => {
    try{
        const user = await userService.changeActiveById(req.params.id);
        res.status(200).json({
            success:true,
            message:"User isActive Changed Successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error While Change isActive User", error:error.message
        });
    }
};

//Change User's Password by Id
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords are required"
            });
        }

        const result = await userService.changePassword(
            req.params.id,
            { currentPassword, newPassword }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {createUser, getAllUser, getById, getByName, getByEmail, updateById, changeActiveById, changePassword};