import userrModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { body, header, validationResult } from "express-validator"
import jwt  from "jsonwebtoken";


const generateToken = async (user, key, expiresIn, tokenType) => {
    try {
        return jwt.sign(user, key, { expiresIn });
    } catch (error) {
        console.error(`Error occurred in generating ${tokenType} token`, error);
        throw new Error(`Token creation failed for ${tokenType}`);
    }
}
const generateAccessToken = async (user) => {
    return generateToken(user, 'my_access_key', '15m', 'access');
}

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'my_access_key');
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log("errr")

        res.status(401).json({ success: false, message: 'Please authenticate' });
    }
};



const adminLogin = async(req,res)=>{
    try {
        const errors = validationResult(req)
        console.log(errors.array())
        if(!errors.isEmpty()){
            return res.status(200).json({success:false,message:"error occured in validation"})
        }

        const {email,password} = req.body;
        console.log(req.body)

        const admin = await userrModel.findOne({email});


        if(!admin){
           return res.status(404).json({success:false,message:"admin not found"})
        }
        const validPass = await bcrypt.compare(password,admin.password)

        if(!validPass || !admin){
            return res.status(200).json({success:false,message:"Invlaid email or password "})
        }

        if(!admin.isVerified){
            return res.status(200).json({success:false,message:"admin email is not verified "})
        }

        if(!admin.isAdmin){
            return res.status(200).json({success:false,message:"you have no access"})
        }
        const accessToken = await generateAccessToken({user:admin})
        console.log(accessToken,"the access token is here")
        return res.status(200).json({success:true,message:"login success",accessToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"server error occured"})
    }
}

const userDisplay = async (req, res) => {
    try {
        console.log("iuiuiiui")
      const userData = await userrModel.find({}).select('-password');
      if (userData) {
        return res.status(200).json({ success: true, message: 'user data found', user: userData });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("user id getting", userId);

        const deleteuser = await userrModel.findByIdAndDelete(userId);

        console.log(deleteuser, "deter");
        if (deleteuser) {
            console.log("respopopopopop")
            return res.status(200).json({ success: true, message: "Deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server error occurred" });
    }
};

export {adminLogin,userDisplay,DeleteUser,authenticate}
