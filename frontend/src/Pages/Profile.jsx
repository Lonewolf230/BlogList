import axios from 'axios'
import AuthContext from '../Auth/AuthProvider'
import { useContext, useEffect, useState } from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import ConfLogOut from '../Utils/ConfLogOut'

// export function loader(){
//     axios.get('/api/users')
// }

export default function Profile(){

    const [popUp,setPopUp]=useState(false)
    const {logOut,loggedIn}=useContext(AuthContext)
    const [user,setUser]=useState(null)
    const navigate=useNavigate()

    const confirmLogOut=()=>{
        setPopUp(true)
    }

    const handleLogOut=()=>{
        logOut() 
        navigate('../../')
    }

    const getProfile=async()=>{
        try{
            const result=await axios.get(`/api/users/profile`,{
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
    },[])

    if(!user){
        return <h1>Loading...</h1>
    }

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
                    <div className='text-center mt-12'>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto" onClick={confirmLogOut}>Log Out</button>
                    </div>
                </div>
                    {popUp && <ConfLogOut onConfirm={handleLogOut} onCancel={()=>setPopUp(false)} />}
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