import { check } from 'express-validator';

export const registerValidator = [
    check('name', 'Name is required').trim().not().isEmpty().withMessage('Name is required').custom((value) => {
        if (value.trim().length === 0) {
            throw new Error('Name is required');
        }
        return true;
    }),
    
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('phone', 'Mobile should contain 10 digits').isLength({
        min: 10,
        max: 10
    }),
    check('password', 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character').isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
];



export const loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
   check('password', 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character').isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
]

export const editUserValidation = [
    check('name', 'Name is required').trim().not().isEmpty().withMessage('Name is required').custom((value) => {
        if (value.trim().length === 0) {
            throw new Error('Name is required');
        }
        return true;
    }),
    check('phone', 'Mobile should contain 10 digits').isLength({
        min: 10,
        max: 10
    })
]