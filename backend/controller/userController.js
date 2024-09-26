import userrModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { body,validationResult } from "express-validator";
import { v2 as cloudinary} from 'cloudinary'
import {jwtDecode} from "jwt-decode";


cloudinary.config({ 
    cloud_name:  'dlcm5poe3', 
    api_key:'599124394655399',
    api_secret: '4NS5mGSzt1Zv-pvqshpxW5Shgx0' 
});

const createUser = async (req, res) => {
    try {
        console.log("ivade thanne")
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log("ioioiooioioo")
            return res.status(400).json({ success: false, validation: true, message: 'Validation errors', errors: errors.array() });
        }

        const { name, email, phone, password, confirmpassword } = req.body;
        console.log("here")
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result,"the image")
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, validation: false, message: "Password and confirm password do not match" });
        }

        const userData = await userrModel.findOne({ email: email });
         console.log("opo1")
        const mobile = await userrModel.findOne({ phone: phone });
        console.log("opo1")

        if (userData) {
            console.log("opo2")
            return res.status(400).json({ success: false, message: 'User Already Exists' });

        } else if (mobile) {
            console.log("opo3")
            return res.status(400).json({ success: false, message: 'Mobile Already Exists' });

        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            console.log("ivde")
            const newUser = new userrModel({
                name:name,
                email:email,
                phone:phone,
                image:result.secure_url,
                password: hashPassword,
                isVerified:true
            });
            console.log("ivde",newUser)
                const userData = await newUser.save();
                console.log("last console",userData)
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
    return generateToken({ user }, 'my_access_key', '15m', 'access');
};


const generateRefreshToken = async (user) => {
    return generateToken(user, 'my_refresh_key', '1y', 'refresh');
}

const userLogin = async (req,res)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log("error here")
        console.log(errors)
     return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
    } 

    const {email,password} = req.body
    console.log("hello")
    console.log(req.body,"bodu")
    const user = await userrModel.findOne({email:email})
    console.log(user)
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
    console.log("herererer")
    const {accessToken} = req.body;
    console.log(req.body)
     const decoded = jwtDecode(accessToken);
    
    console.log("opoppop")
    const email = decoded.user.user.email
    const userData = await userrModel.findOne({email});
    console.log(userData,"userdatra")
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
    const image = req.file;
    console.log(image)

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
     if(image){
        console.log(image)
        const imageUrl = await cloudinary.uploader.upload(image.path)
        user.image = imageUrl.secure_url
     }

     await user.save();
     res.status(200).json({success:true,message:"user profile updated"})
} catch (error) {
     console.error(error.message)
     return res.status(500).json({message:"internal server error"})
}
}



export {createUser,userLogin,userProfiile,editProfile,loadEditProfile};

