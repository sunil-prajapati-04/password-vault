import jwtToken from 'jsonwebtoken';
import User from '../models/auth.model.js';
import { config } from 'dotenv';
config();

const secrectKey = process.env.SECRECT_KEY;

const jwtAuthMiddleware = async (req,res,next)=>{
    try {
        const cookieToken = req.cookies?.token;
        if(!cookieToken){
            return res.status(404).json({message:"token not found"}); 
        }
        jwtToken.verify(cookieToken,secrectKey,async(err,decoded)=>{
            if(err){
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: "Token expired, please login again" });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(401).json({ error: "Invalid token format" });
                } else {
                    return res.status(401).json({ error: "Token verification failed", });
                }
            }else{
                const user  = await User.findById(decoded.id).select("-master_Password");
                if(!user){
                    return res.status(404).json({message:"User not found"});
                }
                req.user = user;
                next();
            }
        })
    } catch (error) {
        console.log("error in jwtMiddleware: ",error);
        res.status(500).json("unauthorized");
    }
}

export default jwtAuthMiddleware;

