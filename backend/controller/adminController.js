import userrModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { body, validationResult } from "express-validator"
import jwt  from "jsonwebtoken";


const generateAccessToken = async (req,res)=>{
    try {
       return jwt.sign(user,"my_access_key",{expiresIn:'2h'}) 
    } catch (error) {
        console.error(error.message)
    }
}

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

        console.log(admin)

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
        console.log(accessToken,"tokem is here")
        return res.status(200).json({success:true,message:"login success",accessToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"server error occured"})
    }
}

const userDisplay = async(req,res)=>{

    try {
        const userData = await userrModel.find({})
        if(userData){
            return res.status(200).json({success:true,message:"user data found",user:userData})
        }
    } catch (error) {
        
    }
}

const DeleteUser = async(req,res)=>{
    try {
        const userId = req.params.userId
        console.log("user id getting" ,userId)
        const deleteuser = await userrModel.findByIdAndDelete({_id:userId});

        if(deleteuser){
            return res.status(200).json({success:true,message:"deleted successfully"})
        }else{
            return res.status(404).json({success:false,message:"user not found"})
        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message:"servere error occured"})
    }
}
export {adminLogin,userDisplay,DeleteUser}
