import express from 'express';
import passport from 'passport';
import jwtAuthMiddleware from '../middelware/auth.middleware.js';
import { otpLimiter } from '../middelware/limiter.js';
import {googleCallback,signUp,requestOtpLogin,verifyOtpLogin,myProfile,updateProfile,logout} from '../controller/auth.controller.js';


const router = express.Router();

router.get('/google',passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }),googleCallback);

router.post('/signup',signUp);
router.post('/requestOtpLogin',otpLimiter,requestOtpLogin);
router.post('/verifyOtpLogin',verifyOtpLogin);
router.get('/profile',jwtAuthMiddleware,myProfile);
router.post('/logout',jwtAuthMiddleware,logout);
router.put('/update',jwtAuthMiddleware,updateProfile);


export default router;