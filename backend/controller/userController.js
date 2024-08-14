import userrModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { body,validationResult } from "express-validator";


const createUser = async (req, res) => {

    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validation: true, message: 'Validation errors', errors: errors.array() });
        }

        const { name, email, phone, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, validation: false, message: "Password and confirm password do not match" });
        }

        const userData = await userrModel.findOne({ email: email });

        const mobile = await userrModel.findOne({ phone: phone });
        if (userData) {
            return res.status(400).json({ success: false, message: 'User Already Exists' });
        } else if (mobile) {
            return res.status(400).json({ success: false, message: 'Mobile Already Exists' });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new userrModel({
                name:name,
                email:email,
                phone:phone,
                password: hashPassword
            });
                const userData = await newUser.save();
            return res.status(201).json({ success: true, message: 'User created successfully', user: userData });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const generateToken = async (user, key, expiresIn, tokenType) => {
    try {
        return jwt.sign(user, key, { expiresIn });
    } catch (error) {
        console.error(`Error occurred in generating ${tokenType} token`, error);
        throw new Error(`Token creation failed for ${tokenType}`);
    }
}

const generateAccessToken = async (user) => {
    return generateToken(user, 'my_access_key', '1y', 'access');
}

const generateRefreshToken = async (user) => {
    return generateToken(user, 'my_refresh_key', '1y', 'refresh');
}

const userLogin = async (req,res)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log(errors)
     return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
    } 

    const {email,password} = req.body
    const user = await userrModel.findOne({email:email})
    if(!user){
        return res.status(200).json({success:false,message:"invalid email or password"})
    }

    const validPass = await bcrypt.compare(password,user.password)

    if(!validPass){
        return res.status(200).json({success:false,message:"Invalid wmail or password"})
    }

    if(!user.isVerified){
       return res.status(200).json({success:false,message:"verify your email"});
    }

    const accessToken = await generateAccessToken({user:user});
    const refreshToken = await generateRefreshToken({user:user});
    return res.status(200).json({ success: true, message: "Login successful", accessToken , refreshToken,email});

}

const userProfiile = async(req,res)=>{
try {

    const {email} = req.body;
    const userData = await userrModel.findOne({email});
    if(userData){
        return(res.status(200).json({success:true,message:"Profle page loaded",user:userData}))
    }
    return(res.status(404).json({success:false,message:"user not found"}))
} catch (error) {
    console.error(error.message)
    res.status(500).json({success:false,message:"internal server error"})
}
}


const editProfile = async (req,res)=>{
    try {
        const userId = req.params.userId
        const userData = await userrModel.findOne({_id:userId})
         
        if(userData){
            return res.status(200).json({success:true,message:"user found",user:userData})
        }
        return res.status(404).json({success:false,message:"user not found"})
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message:"internal vserver error"})
    }
}

const loadEditProfile = async (req,res)=>{
try {
    const errors = validationResult(req);
    console.log(errors.array())
    if(!errors.isEmpty()){
        return res.status(200).json({success:false,message:"validation error",errors:errors.array()})
    }
    const {name,phone,email} = req.body;
    console.log(req.body,"jkjkjkkj")
    const user = await userrModel.findOne({email:email})

     if(!user){
        return res.status(200).json({success:false,message:"usert not found"})
     }

     const checkPhone = await userrModel.findOne({phone,_id:{$ne: user._id}});
     if(checkPhone){
        return res.status(200).json({success:false,message:"phobe already exist"});
     }
     user.name = name
     user.phone = phone

     await user.save();
     res.status(200).json({success:true,message:"user profile updated"})
} catch (error) {
     console.error(error.message)
     return res.status(500).json({message:"internal server error"})
}
}



export {createUser,userLogin,userProfiile,editProfile,loadEditProfile};

