import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/tokenslice'
import { useState,useEffect } from 'react'
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import AdminHeader from './AdminHeader'


function UserList() {

    const [userData,setuserData] =useState([])
    const [searchQuery,setSearchQuery] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenobject = useSelector((state) => state.admin.AdminAccessToken);
    const token = tokenobject.AdminaccessToken
    console.log("the tokjen is heree",token)
    if(token){


    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                
                console.log("klkl")
                const response = await axios.get('http://localhost:3000/admin/displayuser', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });   


      
                console.log(response,"sespoense")
                const users = response.data.user
                 console.log(users,"userssssss")
                if(Array.isArray(users)){
                  console.log("kittikt")
                  setuserData(users)
                }else{
                  setuserData([])
                  console.error("response is not an array",users)
                }
            } catch (error) {
                console.error(error)
            }
   
        }
        fetchData();
      },[])
    }
      const handleEditUser =(user)=>{
        console.log("kjghedujgdfhkJQDFGH")
        dispatch(setUserData(user))
        navigate('/admin/editprofile')
      }

      const handleDeleteUser = async (userId)=>{
          try {
            const confirmResult = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this user!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if(confirmResult.isConfirmed){
            console.log(userId)
    
             await axios.delete(`http://localhost:3000/admin/deleteuser/${userId}`)
             
             console.log("happennd")
             const response = await axios.get('http://localhost:3000/admin/displayuser', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
             console.log("hereerere")
    
             console.log(response,"sespoense")
             const users = response.data.user
              console.log(users,"userssssss")
             if(Array.isArray(users)){
               console.log("kittikt")
               setuserData(users)
             }else{
               setuserData([])
               console.error("response is not an array",users)
             }
             toast.success("user deleted successfully")
            }
          } catch (error) {
            console.error("error in user delete",error)
            toast.error("error occured in delete")
          }
      }

      const filteredUsers = userData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );  
  

  
  return (
    <div>
            <AdminHeader/>

        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-semibold text-white">User Management</h2>
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control me-3"
                    />
                    <Link to="/admin/adduser" className="btn bg-white fw-bold">
                        Add User
                    </Link>
                </div>
            </div>
            <table className="table table-bordered text-white">
                <thead className="table-dark bg-black">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-dark">
                    {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>    <img style={{width:'60px', height:'60px', objectFit: 'cover'}} src={user.image} alt="" /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user)} className="btn btn-success me-2">Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

    
}

export default UserList



