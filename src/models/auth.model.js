import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const vaultUserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        unique:true,
        sparse:true
    },
    username:{
        type:String
    },
    email:{
        type:String,
        match: /.+\@.+\..+/
    },
    master_Password:{
        type:String,
        minLength:6
    },
    otp:{
        code:String,
        expiresAt:Date
    }
},
{timestamps:true}
)

vaultUserSchema.pre('save', async function(next) {
    try {
        const user = this;
        if(!user.isModified('master_Password')){
            return next;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.master_Password,salt);
        user.master_Password = hashPassword;
        next();
    } catch (error) {
        throw next(error);
    }
})

vaultUserSchema.methods.comparePassword = async function(password){
    try {
        const isMatch = await bcrypt.compare(password,this.master_Password);
        return isMatch;
    } catch (error) {
        return error;
    }
}

const vaultUser = mongoose.model("vaultUser",vaultUserSchema);

export default vaultUser;
