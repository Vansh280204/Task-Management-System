const authService = require('../services/authService');

const login = async (req,res) => {
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            });
        }
        const result = await authService.login({email,password});
        res.status(200).json({
            success:true,
            message:"Login Successful",
            data:result
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {login};