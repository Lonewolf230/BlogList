import axios from 'axios'
import AuthContext from '../Auth/AuthProvider'
import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate,useParams } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

export default function ProfileOther(){

    const [popUp,setPopUp]=useState(false)
    const {logOut,loggedIn}=useContext(AuthContext)
    const [user,setUser]=useState(null)
    const [follow,setFollow]=useState(false)
    const navigate=useNavigate()
    const {id}=useParams()
    const idofLoggedinUser=jwtDecode(localStorage.getItem('token')).id
    console.log(idofLoggedinUser);


    const getProfile=async()=>{
        try{
            const result=await axios.get(`/api/users/profile/${id}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result)
            return result.data
        }
        catch(err){
            console.log(err)
        }
    }

    const toggleFollow=async()=>{
        const followStatus= !follow
        try{
            await axios.post(`/api/users/${user.username}/follow`,{...user,follow:followStatus},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            setUser(prev=>({
                ...user,
                followers: followStatus ? [...prev.followers,idofLoggedinUser]:prev.followers.filter(follower=>follower!==idofLoggedinUser)
            }))
            setFollow(followStatus)
            
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        try{
            const fetchUser=async()=>{
                const user=await getProfile()
                console.log(user);
                setUser(user)
                
            }
            fetchUser()
        }
        catch(err){
            console.log(err);
        }
    },[id])

    useEffect(()=>{
        if(user){
            setFollow(user.followers.includes(idofLoggedinUser))
        }
    },[user,idofLoggedinUser])

    if(!user){
        return <h1>Loading...</h1>
    }

    console.log(user._id);
    console.log(idofLoggedinUser);

    return(
        <>
            {loggedIn?(
                <>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col bg-gray-200 p-8 mx-72 mt-14 rounded-xl gap-5 font-bold w-1/2'>
                        <h2 >USERNAME : <span className='text-blue-600 '>{user.username}</span></h2>
                        <h2>NAME : <span className='text-blue-600 '>{user.name}</span></h2>
                        <h3>No of Blogs posted : <span className='text-blue-600 '>{user.blogs.length}</span></h3>
                        <h3>Followers: <span className='text-blue-600 '>{user.followers.length}</span></h3>
                        <h3>Following: <span className='text-blue-600 '>{user.following.length}</span></h3>
                    </div> 
                    { user._id !== idofLoggedinUser && (
                    <div className='text-center mt-12'>
                       <button className={follow?"bg-white text-blue-600 border-blue-600 py-2 px-4 rounded":"bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto"} onClick={toggleFollow} >{follow? 'Following':'Follow'}</button>
                    </div>)
        }
                </div>
                    
                </>)
                :(
                    <>
                    <div className="flex flex-col items-center justify-center  min-h-screen ">
                        <h1 className="text-blue-600 text-4xl font-black mb-6">Please Log In to your Account </h1>
                        <NavLink  to='../../' className="hover:underline hover:cursor-pointer text-2xl">Log In</NavLink>
                    </div>
                </>
                )
            }
        </>
    )
}                             






