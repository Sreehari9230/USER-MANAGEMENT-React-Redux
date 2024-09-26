import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addAdminItems,addItems} from '../redux/tokenslice'
import toast from "react-hot-toast";



function AdminLogin() {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    
    const handlesubmit = async(e) =>{
      e.preventDefault();

      try {
         setEmailError('')
         setPasswordError('')

         const value = {email,password}
         const response = await axios.post('http://localhost:3000/admin/adminlogin',value);

         const adminData = response.data


         if(adminData.success){
            toast.success("login successfull")


            dispatch(addAdminItems({
                isVerifiedAdmin:true,
                AdminaccessToken:adminData.accessToken
            }))

            
            navigate('/admin/users')
         }
      } catch (error) {
        
      }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
          <div className="border p-4 w-50 rounded bg-white" style={{ width: '18rem' }}>
            <div className="mb-3">
              <h1 className="text-center h4">ADMIN LOGIN</h1>
            </div>
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  name="email"
                />
                {emailError && <span className="text-danger">{emailError}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  name="password"
                />
                {passwordError && <span className="text-danger">{passwordError}</span>}
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">Login</button>
              </div>
              <div className="mt-3 text-center">
                <p>Are you a user? <Link to='/' className="text-primary">User</Link></p>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default AdminLogin
