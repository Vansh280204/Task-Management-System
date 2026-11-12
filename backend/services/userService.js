const User = require("../models/userModel");
const { hashPassword } = require("../utils/password");
const bcrypt = require("bcryptjs");
const userService = {

    //Create User
    createUser: async (data) => {
        try{
            const {name, email, phone, address, password} = data;
            const existingEmail = await User.findOne({ email });
            if(existingEmail){
                throw new Error("Email Already Register");
            }
            const existingPhone = await User.findOne({ phone });
            if(existingPhone){
                throw new Error("Phone Already Register");
            }
            const passwordHash = await hashPassword(password);
            const user = await User.create({name, email, phone, address,passwordHash});
            return{
                data:user
            };
        }catch(error){
            throw error;
        }
    },

    //Get All User
    getAllUser: async () => {
        try{
            const user = await User.find();
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Retriving User: ${error.message}`);
        }
    },

    //Get User's By Id
    getById: async (id) => {
        try{
            const user = await User.findById(id);
            if(!user){
                throw new Error("User Not Found");
            }
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Retriving User: ${error.message}`);
        }
    },

    //Get User by Name
    getByName: async (name) => {
        try{
            const user = await User.findOne({ name });
            if(!user){
                throw new Error("User Not Found");
            }
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Retriving User: ${error.message}`);
        }
    },

    //Get User by Email
    getByEmail: async (email) => {
        try{
            const user = await User.findOne({ email });
            if(!user){
                throw new Error("User Not Found");
            }
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Retriving User: ${error.message}`);
        }
    },

    //Update by Name
    updateById: async (id,data) => {
        try{
            const {email,phone,address} = data;
            const user = await User.findByIdAndUpdate(
                id,
                {$set:data}
            );
            if(!user){
                throw new Error("User Not Found");
            }
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Updating User: ${error.message}`);
        }
    },

    //Change isActive by ID
    changeActiveById: async (id) => {
        try{
            const user = await User.findById(id);
            if(!user){
                throw new Error("User Not Found");
            }
            user.isActive = !user.isActive;
            await user.save();
            return{
                data:user
            };
        }catch(error){
            throw new Error(`Error While Changing isActive User: ${error.message}`);
        }
    },

    //Change User's Password By Id
    changePassword: async (userId, data) => {
        try {
            const { currentPassword, newPassword } = data;

            const user = await User.findById(userId)
                .select("+passwordHash");

            if (!user) {
                const error = new Error("User Not Found");
                error.statusCode = 404;
                throw error;
            }

            // Verify current password
            const isMatch = await bcrypt.compare(
                currentPassword,
                user.passwordHash
            );

            if (!isMatch) {
                const error = new Error("Current Password is Incorrect");
                error.statusCode = 400;
                throw error;
            }

            if (currentPassword === newPassword) {
                const error = new Error(
                    "New Password must be different from current password"
                );
                error.statusCode = 400;
                throw error;
            }

            // Hash new password
            const passwordHash = await hashPassword(newPassword);

            user.passwordHash = passwordHash;
            await user.save();

            return {
                success: true,
                message: "Password Changed Successfully"
            };

        } catch (error) {
            throw error;
        }
    }
};


module.exports = userService;