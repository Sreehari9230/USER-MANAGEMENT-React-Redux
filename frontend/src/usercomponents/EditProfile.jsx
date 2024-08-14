import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'


function EditProfile() {
    const [name,setName]=useState('')
    const [email,setEmail] = useState('');
    const[phone,setPhone] = useState('')
    const navigate = useNavigate()
    const [nameError,setNameError] = useState('')
    const [phoneError,setPhoneError] = useState('')
    const accessToken = useSelector((store)=>store.user.UseraccessToken)

    useEffect(()=>{
        const fetchData = async ()=>{

            try {
                const decoded = jwtDecode(accessToken); 
                console.log(decoded.user._id,"decoded")
                const response = await axios.post(`http://localhost:3000/api/editprofile/${decoded.user._id}`);
                setName(response.data.user.name)
                setEmail(response.data.user.email)
                setPhone(response.data.user.phone)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    },[accessToken])

    const handlesubmit = async(e) =>{
       e.preventDefault()
       try {
        setNameError('')
        setPhoneError('')
        const formData = new FormData()
        formData.append('name',name)
        formData.append('email',email)
        formData.append('phone',phone)
      
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post('http://localhost:3000/api/editprofile', formData, {
            headers: {
              'Content-Type':'application/json'
            }
          });
          
            if(response.data.success){
                toast.success('Profile Updated')
                navigate('/profile')
            }else{
                if(response.data.validation){
                    response.data.errors.forEach((error)=>{
                           switch (error.path) {
                            case 'name':
                              setNameError(error.msg)  
                                break;
                            case 'phone':{
                                setPhoneError(error.msg)
                            }
                            default:
                                break;
                        }
                    })
                }else{
                    toast.error("error occured in validation")
                }
            }
       } catch (error) {
        console.error('error occured')
        toast.error('error occured in update profile')
       }
    }

    return (
        <div>
            <Header />
            <br />
            <div className="border w-50 mx-auto p-4 rounded bg-white">
                <h1 className="text-center h4 font-weight-bold mb-3">Edit Profile</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="Name"
                            name="name"
                        />
                        {nameError && <span className="text-danger">{nameError}</span>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder="Phone"
                            name="phone"
                        />
                        {phoneError && <span className="text-danger">{phoneError}</span>}
                    </div>
                    {/* <div className="mb-3">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control"
                            name="image"
                        />
                    </div> */}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default EditProfile