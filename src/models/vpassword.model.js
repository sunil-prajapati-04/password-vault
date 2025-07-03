import mongoose from "mongoose";

const vaultPasswordSchema = new mongoose.Schema({
    vaultUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vaultUser",
        required:true
    },
    vaultTitle:{
        type:String
    },
    passwords:[
        {
            pass:{
                type:String
            },
            createdAt:{
                type:Date,
                default:()=> new Date()
            }
        }
    ]
},
{timestamps:true}
)


const Vaults = mongoose.model("Vaults",vaultPasswordSchema);

export default Vaults;