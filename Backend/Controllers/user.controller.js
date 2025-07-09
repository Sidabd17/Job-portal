const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDataUri = require("../utils/datauri");
const cloudinary  = require("../utils/cloudinary");

const register = async(req , res)=>{
    try{
        const {fullname , email, phoneNumber, password , role} = req.body;
        

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            }) 
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        user = await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })

        return res.status(201).json({
            message:"Account created successfully",
            user,
            success:true
        })
   }catch(err){
       console.log(err);
   };
   
}

const login = async(req, res)=>{
    try{
       const {email , password , role} = req.body;

       if(!email || !password || !role){
         return res.status(400).json({
             message:"Something is Missing",
             success:false
          })
       }

       let user = await User.findOne({email});
       if(!user){
        return res.status(400).json({
            message:"Incorrect email or password",
            success:false
         })
       }

       const passMatched = await bcrypt.compare(password, user.password);
        if(!passMatched) {
           return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        if(role !== user.role){
           return res.status(400).json({
                message:"Incorrect role",
                success:false
            })
        }

        const tokenData = {
            userId: user._id
        }
       const token = await jwt.sign(tokenData , process.env.SECRET_KEY, {expiresIn: '1d'});

       user = {
         _id:user._id,
         fullname:user.fullname,
         email:user.email,
         phoneNumber:user.phoneNumber,
         role:user.role,
         profile:user.profile
       }

       return res.status(200)
           .cookie('token' ,token , {
                maxAge:24*60*60*1000 , 
                httpOnly:true ,
                secure:true ,
                sameSite:'None'
            })
           .json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
       })

    }catch(err){
        console.log(err);
    }
}

const logout = async (req, res)=>{
    try {
        return res.status(200).cookie("token" , "" , {maxAge:0}).json({
            message:"Logged out Succesfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

const updateprofile = async(req, res)=>{
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;

        //cloudinary

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const skillsArray = skills?.split(",");
        const userId = req.id;
         
        
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User is not found",
                success:false
            })
        }

        // cloudinary implementation

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio)user.profile.bio = bio;
        if(skillsArray) user.profile.skills = skillsArray

        //resume will later implemented
        if(cloudResponse){
           user.profile.resume = cloudResponse.secure_url;
           user.profile.resumeOriginalName=file?.originalname;
        }

        await user.save();
        
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
          }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })  

    } catch (error) {
        console.log(error);
        
    }
}

const updateProfilephoto = async(req, res)=>{
    try {
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const userId = req.id;
         
        
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User is not found",
                success:false
            })
        }

        user.profile.profilePhoto = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message:"Profile photo updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {register , login, logout, updateprofile, updateProfilephoto};