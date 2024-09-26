import express from 'express';
import { createUser, editProfile, loadEditProfile, userLogin,userProfiile, } from '../controller/userController.js';
import path from 'path';
import multer from 'multer'
import {fileURLToPath} from 'url'
import { registerValidator, loginValidation, editUserValidation } from '../validation/validation.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, '..', 'public', 'images'));
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

console.log(createUser); // Should not be undefined

const router = express.Router();

router.post('/create',upload.single('image'),registerValidator,createUser);
router.post('/login',loginValidation,userLogin)
router.post('/getuser',userProfiile)
router.post('/editprofile/:userId',editProfile)
router.post('/editprofile',upload.single('image'),editUserValidation,loadEditProfile)

export default router;
