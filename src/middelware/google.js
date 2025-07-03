import passport from 'passport';
import pkg from 'passport-google-oauth20';
import User from '../models/auth.model.js';
import {config} from 'dotenv';

config();

const {GoogleStrategy} = pkg;

passport.use(new GoogleStrategy({
    clientID:process.env.Google_Client_Id,
    clientSecrect:process.env.Google_Client_Secrect,
    callbackURL: "https://password-vault-21m8.onrender.com/pV/auth/google/callback"

}, async(accessToken, refreshToken, profile, done)=>{
    try {
    const user = await User.findOne({googleId:profile.id});
    if(!user){
        
        user = await User.create({
            googleId:profile.id,
            username:profile.displayName,
            email:profile.emails[0].value,
            master_Password: "OAUTH_GOOGLE"
        })
    }
    return  done(null,user);
    }catch (error) {
        return done(error,null)
    }
}));

