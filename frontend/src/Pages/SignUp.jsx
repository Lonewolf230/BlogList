import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function SignUp(){
    const baseUrl='/api/users'

    const [userData,setUserData]=useState({username:"",name:"",password:"",repassword:""})
    const [passwordMatch,setPasswordMatch]=useState(false)

    const handleSubmit=()=>{

    }

    useEffect(()=>{
        if(userData.password !=='' && userData.repassword!==''){
            if(userData.password !== userData.repassword)
                setPasswordMatch(true)
            else
                setPasswordMatch(false)
        }
        else
            setPasswordMatch(false)
    },[userData.password,userData.repassword])

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUserData(prev=>({
            ...prev,
            [name]:value
        }))

        
    }

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="flex flex-col gap-10 p-5 bg-white shadow-md rounded" method="post" onSubmit={handleSubmit} >
                <h2 className="text-center text-blue-600 text-2xl font-black">Sign Up</h2>
                <input
                className="border-black p-4 rounded w-80"
                name="username"
                type="text"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                />
                <input
                className="border-black p-4 rounded w-80"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                placeholder="This is the name that users will see"
                />
                <input
                className="border-black p-4 rounded w-80"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                />
                <input
                className="border-black p-4 rounded w-80"
                name="repassword"
                type="password"
                value={userData.repassword}
                onChange={handleChange}
                placeholder="Re-Enter Password"
                />
                {userData.password.length > 0 && userData.repassword.length > 0 && (
                    <p className={`text-red-600 text-sm ${passwordMatch ? '' : 'hidden'}`}>Passwords don't match</p>
                )}
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Sign Up
                </button>

                <Link to="../login"><h3 className="text-blue-600 text-sm text-right cursor-pointer">Already an User? Login</h3></Link>
            </form>
            </div>
        </>
    )
}