import express from 'express';
import jwtAuthMiddleware from '../middelware/auth.middleware.js';
import { otpLimiter } from '../middelware/limiter.js';
import {signUp,requestOtpLogin,verifyOtpLogin,myProfile,updateProfile,logout} from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup',signUp);
router.post('/requestOtpLogin',otpLimiter,requestOtpLogin);
router.post('/verifyOtpLogin',verifyOtpLogin);
router.get('/profile',jwtAuthMiddleware,myProfile);
router.post('/logout',jwtAuthMiddleware,logout);
router.put('/update',jwtAuthMiddleware,updateProfile);


export default router;