import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
const accessToken = useSelector((store) => store.user.UseraccessToken);
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const helperFunction = async () => {
            try {
                if (accessToken) {
                    console.log(accessToken, "the access token here");
                    const decoded = jwtDecode(accessToken);
                    console.log(decoded.user.email,"opopopo")
                    const response = await axios.post('http://localhost:3000/api/getuser', { email: decoded.user.email },{
                        headers:{
                            'Content-Type' : 'application/json'
                        }
                    });
                    setUserData(response.data.user);
                } else {
                    console.log("No access token found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        helperFunction();
    }, [accessToken]);

  return (
<div>
    <Header/>
<div className="d-flex flex-column align-items-center justify-content-center">
  <div className="bg-light p-4 rounded shadow-sm mt-4 w-100" style={{ maxWidth: '400px' }}>
    {/* <img
      src={userData.image}
      alt="User Avatar"
      className="rounded-circle mx-auto mb-3"
      style={{ width: '128px', height: '128px' }}
    /> */}
    <h2 className="text-center font-weight-bold mb-3">Welcome to Home</h2>
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-2">
        <h5 className="mb-0">Name: {userData.name}</h5>
      </div>
      <div className="d-flex align-items-center mb-2">
        <h5 className="mb-0">Email: {userData.email}</h5>
      </div>
      <div className="d-flex align-items-center mb-2">
        <h5 className="mb-0">Phone: {userData.phone}</h5>
      </div>
      <div className="d-flex align-items-center">
        <span><Link to="/edituser">Edit</Link></span>
      </div>
    </div>
  </div>
</div>

</div>
  )
}

export default Profile