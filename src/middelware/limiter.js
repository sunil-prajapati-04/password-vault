import apiLimit from 'express-rate-limit';

export const otpLimiter = apiLimit({
    windowMs: 0.5 * 60 *1000, //30seconds
    max:1,
    message: {
       status: 429,
       message: "Please wait 30 seconds before requesting a new OTP."
    }     
})