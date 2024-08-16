import express from 'express'
import { loginValidation } from '../validation/validation.js'
import { DeleteUser, adminLogin, userDisplay } from '../controller/adminController.js'

const adminrouter = express.Router()

adminrouter.post('/adminlogin',loginValidation,adminLogin)
adminrouter.get('/displayuser',userDisplay)
adminrouter.delete('/deleteuser/:userId',DeleteUser)

export default adminrouter