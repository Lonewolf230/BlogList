import axios from 'axios'
import AuthContext from '../Auth/AuthProvider'
import { useContext } from 'react'
import { Link,NavLink } from 'react-router-dom'

// export function loader(){
//     axios.get('/api/users')
// }

export default function Profile(){

    const {logOut,loggedIn}=useContext(AuthContext)
    
    return(
        <>
            {loggedIn?(
                <>
                    <div className='flex flex-col bg-gray-200 p-8 mx-72 mt-14 rounded-xl gap-5 font-bold'>
                        <h2 >USERNAME :</h2>
                        <h2>NAME :</h2>
                        <h3>No of Blogs posted :</h3>
                        <h3>Last Blog posted on:</h3>
                        
                    </div>
                    <div className='text-center mt-12'>
                        <Link to="../"><button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto" onClick={logOut}>Log Out</button></Link>
                    </div>
                </>)
                :(
                    <>
                    <div className="flex flex-col items-center justify-center  min-h-screen ">
                        <h1 className="text-blue-600 text-4xl font-black mb-6">Please Log In to your Account </h1>
                        <NavLink  to='../../login' className="hover:underline hover:cursor-pointer text-2xl">Log In</NavLink>
                    </div>
                </>
                )
            }
        </>
    )
}