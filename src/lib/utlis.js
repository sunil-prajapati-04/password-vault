import jwtToken from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const secrectKey = process.env.SECRECT_KEY;

export const genToken = (userData)=>{
    try {
        const token = jwtToken.sign(userData,secrectKey,{
            expiresIn:"7d"
        });
        return token;       
    } catch (error) {
       return error;
    }
}
