import User from '../models/auth.model.js';
import { genToken } from '../lib/utlis.js';
import { sendEmailOtp } from '../lib/sendEmailOtp.js';

export const signUp = async (req,res)=>{
    try {
        const {username,email,master_Password} = req.body;
        const user = await User.findOne({email});
        if(!email || !username || !master_Password){
            return res.status(404).json({message:"All fields are required"});
        }
        if(user){
            return res.status(429).json({message:"email already exists"});
        }
        if(master_Password.length<6){
            return res.status(429).json({message:"Password must be atleast 6 character"});
        }
        const newUser = new User({
            username,
            email,
            master_Password
        })
        await newUser.save();
        return res.status(200).json({message:"Registered successfully"});
    } catch (error) {
        console.log("error in signUp controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const requestOtpLogin  = async  (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json({message:"Invalid email or password"});
        }
        const username = user.username;
        console.log(username);
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = {code:otp ,expiresAt:Date.now() + 5 * 60 * 1000};
        await sendEmailOtp(email,otp,username);

        await user.save();
        res.status(200).json({message:"OTP sent to your registered email address"});
    } catch (error) {
        console.log("error in requestOtpLogin controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const verifyOtpLogin = async(req,res)=>{
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({email});
        if(!user || !user.otp || user.otp.code !== otp){
            return res.status(401).json({message:"otp is invalid"});
        }
        if (Date.now() > user.otp.expiresAt) {
            return res.status(410).json({ message: "OTP expired. Please request a new one." });
        }

        const payload = {
            id:user.id,
            username:user.username
        }
        const token  = await genToken(payload);
        res.cookie("token",token,{
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })

        user.otp = null;
        await user.save();

        console.log("token is :",token);
        return res.status(200).json({message:"login successfully"})
    } catch (error) {
        console.log("error in verifyOtpLogin controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const myProfile = async(req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        console.log("error in myProfile controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const updatedData = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(updatedData.email){
            const updatedEmail = updatedData.email;
            const similarEmail = await User.find({email:updatedEmail});
            if(similarEmail && similarEmail.id.toString()!==userId){
                return res.status(200).json({message:"this email already exists"})
            }
        }
        Object.assign(user,updatedData);
        const respon = await user.save();
        console.log(respon);
        return res.status(200).json({message:"User updated successfully",respon})
    } catch (error) {
        console.log("error in updateProfile controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        return res.status(200).json({message:"Logout successfully"});
    } catch (error) {
        console.log("error in logout controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}