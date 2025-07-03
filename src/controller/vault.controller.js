import Vault from '../models/vpassword.model.js';


export const addVault = async (req,res)=>{
    try {
        const {vaultTitle,password} = req.body;
        const userId = req.user.id;
        if(!vaultTitle || !password.length === 0){
            return res.status(404).json({message:"Title and password cannot be empty"})
        }


        //humne yahan password array banya jo hume postman se mila. Map method postman array ke string ko lega aur unnhe object main creat ekarke ek naya password array bana dega jiska naam hain "passwordArr" aur ye array hum assign kar denge hamre model passwords array main 
        let passwordArr = password.map(p=>({pass:p}));


        const newVault = new Vault({
            vaultUserId:userId,
            vaultTitle,
            passwords:passwordArr //here we are asigning new password array to passwords array 
        })
        const respon = await newVault.save();
        console.log(respon);
        return res.status(200).json({message:"Vault Registered successfully",respon});
    } catch (error) {
        console.log("error in addVault controller :",error);
        return res.status(500).json({message:"Internal server error"});
    }
} 

export const getVault = async (req,res)=>{
    try {
        const userId = req.user.id;
        const vault  = await Vault.find({vaultUserId:userId}).select("-vaultUserId");
        if(!vault){
            return res.status(404).json({message:"no vault found"});
        }
        return res.status(200).json(vault);

    } catch (error) {
        console.log("error in getVault controller :",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const addPasswordInVault = async (req,res)=>{
    try {
        const vaultId = req.params.id;
        const {password} = req.body;
        const vault = await Vault.findById(vaultId);
        if(!vault){
            return res.status(404).json({message:"Vault not found"});
        }
        vault.passwords.push({pass:password});
        await vault.save();
        return res.status(200).json({message:`Password added successfully in ${vault.vaultTitle}`});
    } catch (error) {
        console.log("error in addPasswordInVault controller :",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateVaultPassword = async (req,res)=>{
    try {
        const {vaultId, passwordId} = req.params;
        const updatedPassword = req.body.updatedPassword;
        const vault = await Vault.findById(vaultId);
        if(!vault){
            return res.status(404).json({message:"Vault not found"});
        }
        const passwordToUpdate = vault.passwords.find((p)=> p.id === passwordId);
        passwordToUpdate.pass = updatedPassword;
        await vault.save();
        res.status(200).json({message:`Password updated successfully in vault ${vault.vaultTitle}`})
    } catch (error) {
        console.log("error in updateVaultPassword controller :",error);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const deleteVault = async (req,res)=>{
    try {
        const vaultId = req.params.vaultId;
        const vault = await Vault.findByIdAndDelete(vaultId);
        if(!vault){
            return res.status(404).json({message:"vault not found"});
        }
        return res.status(200).json({message:"Vault deleted successfully"});
    } catch (error) {
        console.log("error in deleteVault controller :",error);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const deleteVaultPassword = async (req,res)=>{
    try {
        const {vaultId,passwordId} = req.params;
        const vault = await Vault.findById(vaultId);
        if(!vault){
            return res.status(404).json({message:"Vault not found"});
        }
        const filteredPassword = vault.passwords.filter((p)=> p.id !== passwordId);
        vault.passwords = filteredPassword;
        await vault.save();
        return res.status(200).json({message:`Password successfully deleted from ${vault.vaultTitle} `})
    } catch (error) {
        console.log("error in deleteVaultPassword controller :",error);
        return res.status(500).json({message:"Internal server error"})
    }
}