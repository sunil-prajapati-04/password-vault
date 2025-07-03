import express from 'express';
import { addVault, getVault, addPasswordInVault, updateVaultPassword, deleteVault, deleteVaultPassword } from '../controller/vault.controller.js';
import jwtAuthMiddleware from '../middelware/auth.middleware.js';


const router = express.Router();

router.post('/addVault',jwtAuthMiddleware,addVault);
router.get('/getVault',jwtAuthMiddleware,getVault);
router.post('/addPassword/:id',jwtAuthMiddleware,addPasswordInVault);
router.put('/updateVaultPassword/:vaultId/:passwordId',jwtAuthMiddleware,updateVaultPassword);
router.put('/deleteVaultPassword/:vaultId/:passwordId',jwtAuthMiddleware,deleteVaultPassword);
router.delete('/deleteVault/:vaultId',jwtAuthMiddleware,deleteVault);




export default router;