import express from 'express';
import { createUser, editProfile, loadEditProfile, userLogin,userProfiile, } from '../controller/userController.js';
import path from 'path';
import { registerValidator, loginValidation, editUserValidation } from '../validation/validation.js';

console.log(createUser); // Should not be undefined

const router = express.Router();

router.post('/create',registerValidator,createUser);
router.post('/login',loginValidation,userLogin)
router.post('/getuser',userProfiile)
router.post('/editprofile/:userId',editProfile)
router.post('/editprofile',loadEditProfile)

export default router;
