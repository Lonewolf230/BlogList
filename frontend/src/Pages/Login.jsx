import axios from "axios"
import { Form,useNavigate,Link } from "react-router-dom"
import { useState,useContext } from "react"
import AuthContext from "../Auth/AuthProvider"

export default function Login(){
    const baseUrl='/api/login'

    const {logIn,setError,setLoading,loading,error}=useContext(AuthContext)

    const [userData,setUserData]=useState({username:"",password:""})
    

    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setLoading(true)
        
        const login={
            username:userData.username,
            password:userData.password
        }
        try{
           const response=await axios.post(baseUrl,login)
           const token=response.data.token
           logIn(token)
           await navigate('/main')
        }
        catch(err){
            setError("User does not exist/ Please check your credentials")
        }
        finally{
            setLoading(false)
        }
            
    }

    function handleChange(e){

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
                <h2 className="text-center text-blue-600 text-2xl font-black">Login</h2>
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
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Log In
                </button>

                <Link to="../signup"><h3 className="text-blue-600 text-sm text-right cursor-pointer">New User? Sign Up</h3></Link>
            </form>
        </div>
            {loading?<div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-[#332d2d] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>:""}
            {error?
                `<h3 className="text-center text-red-600 mt-5">${error}</h3>`:""

            }

    </>
)
}