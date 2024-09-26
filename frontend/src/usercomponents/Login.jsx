import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {useDispatch } from "react-redux";
import { addItems,addMail } from "../redux/tokenslice";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () =>{
    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const [emailError,setEmailError]= useState('')
    const [passwordError,setPasswordError] = useState('')

    const handlesubmit = async (e)=>{

        e.preventDefault()
        try {
            setEmailError('')
            setPasswordError('')
            const value = {email,password}
            const response = await axios.post('http://localhost:3000/api/login',value);
            console.log("1",response)
            const userData = response.data
            
            if(userData.success){
            toast.success('login success')

            console.log(userData.accessToken,"access token in login")
            console.log("herepopopo")
            dispatch(addItems({
                isVerifiedUser: true,
                accessToken: userData.accessToken,
            }));

            console.log(userData.email)
            dispatch((addMail(userData.email)))

            navigate('/home')
          }else{
            if(response.data.validation){
                response.data.errors.forEach((error)=>{
                    switch(error.path){
                        case 'email':
                            setEmailError(error.msg)
                            break;
                        case 'password':
                            setPasswordError(error.msg)
                            break;
                         default:
                            break;  
                            
                    }
                })
            }else{
                toast.error(response.data.error)
            }
          }
       } catch (error) {
          toast.error("an error occured in login")
          console.error(error.message)
       }
    }


    return (
        <div className="bg-black d-flex justify-content-center align-items-center vh-100">
            <div className="border w-50 mx-auto p-4 rounded bg-white"> {/* Changed to w-40 */}
                <div className="mb-4 text-center">
                    <h1 className="h4 font-weight-bold">Sign In</h1>
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
                        {emailError && <div className="text-danger">{emailError}</div>}
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
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-dark">Login</button>
                    </div>
                    <div className="text-center mb-3">
                        <p>New to this website? <Link to='/register' className="text-primary">Signup</Link></p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted">Or <Link to='/admin/login' className="text-primary">login as admin</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
    
    
    
    
}

export default Login