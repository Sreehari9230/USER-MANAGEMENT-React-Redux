

import React from 'react'
import { useState,useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


function AdminAdduser() {
    const nameRef = useRef()
    const phoneRef= useRef()
    const EmailRef = useRef()
    const PasswordRef = useRef()
    const confirmPassRef = useRef()
    const imageRef = useRef()

   
    const navigate = useNavigate()

    const [nameError,setNameError] = useState('')
    const [phoneError,setPhoneError] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    const [confirmPasswordError,setConfirmPassError] = useState('')
    const [imageError,setImageError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setNameError('');
          setEmailError('');
          setPhoneError('');
          setPasswordError('');
          setConfirmPassError('');
          setImageError('');

      
          const formData = new FormData();
          formData.append('name', nameRef.current.value);
          formData.append('email', EmailRef.current.value);
          formData.append('phone', phoneRef.current.value);
          formData.append('password', PasswordRef.current.value);
          formData.append('image', imageRef.current.files[0]);
          formData.append('confirmpassword', confirmPassRef.current.value);
      


          if (!imageRef.current.files[0]) {
            setImageError('Please upload an image.');
            return;
        }else{
          console.log("jkrhlnfka")
        }
          for (let [key, value] of formData.entries()) {
             console.log(`${key}:${value}`)
          }
          
        const response = await axios.post('http://localhost:3000/api/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
});


       console.log("uiyuyuuuuy")

          console.log(response,"response")
          if (response.data.success) {
            toast.success("Registration Successful");
            nameRef.current.value = '';
            EmailRef.current.value = '';
            phoneRef.current.value = '';
            imageRef.current.value = null
            PasswordRef.current.value = '';
            confirmPassRef.current.value = '';
            navigate('/admin/users');
          } else {
            if (response.data.validation) {
              response.data.errors.forEach((error) => {
                switch (error.path) {
                  case 'name':
                    setNameError(error.msg);
                    break;
                  case 'email':
                    setEmailError(error.msg);
                    break;
                  case 'phone':
                    setPhoneError(error.msg);
                    break;
                  case 'password':
                    setPasswordError(error.msg);
                    break;
                  case 'confirmpassword':
                    setConfirmPassError(error.msg);
                    break;
                    case 'image' :{
                      setImageError(error.msg)
                    }
                  default:
                    break;
                }
              });
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      
    
      return (
        <div className="bg-black d-flex justify-content-center align-items-center vh-100">
            <div className="border border-light w-50 mx-auto p-4 rounded bg-white">
                <h1 className="text-center h4 font-weight-bold mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            ref={nameRef}
                            type="text"
                            className="form-control border-grey"
                            placeholder="Name"
                            name="name"
                        />
                        {nameError && <span className="text-danger">{nameError}</span>}
                    </div>
                    <div className="mb-3">
                        <input
                            ref={EmailRef}
                            type="text"
                            className="form-control border-grey"
                            placeholder="Email"
                            name="email"
                        />
                        {emailError && <span className="text-danger">{emailError}</span>}
                    </div>
                    <div className="mb-3">
                        <input
                            ref={phoneRef}
                            type="text"
                            className="form-control border-grey"
                            placeholder="Phone"
                            name="phone"
                        />
                        {phoneError && <span className="text-danger">{phoneError}</span>}
                    </div>
                    <div className="mb-3">
                        <input
                            ref={PasswordRef}
                            type="password"
                            className="form-control border-grey"
                            placeholder="Password"
                            name="password"
                        />
                        {passwordError && <span className="text-danger">{passwordError}</span>}
                    </div>
                    <div className="mb-3">
                        <input
                            ref={confirmPassRef}
                            type="password"
                            className="form-control border-grey"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                        />
                        {confirmPasswordError && <span className="text-danger">{confirmPasswordError}</span>}
                    </div>
                    <div className="mb-4">
                        <input ref={imageRef} type="file" className="border rounded w-full p-1 mb-1" name="image" />
                        {imageError && <span className="text-red-500">{imageError}</span>}
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-dark">Signup</button>
                    </div>
                </form>
            </div>
        </div>
)
}

export default AdminAdduser



  
    
    

