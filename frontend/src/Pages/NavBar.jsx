import { useState,useEffect,useContext } from "react"
import { Link, NavLink, Outlet,useLocation } from "react-router-dom"
import AuthContext from "../Auth/AuthProvider"
import SvgLogo from "../Logo"


export default function NavBar(){

    const location=useLocation()
    const path=location.pathname
    const isNewBlog= path==='/newblog'
    const {loggedIn,logOut}=useContext(AuthContext)

    

    
    return(
        <>
            <header className="bg-white text-blue-600 text-2xl shadow-md h-20 p-2">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <NavLink to="/">HOME</NavLink>
                    </div>
                    <nav className="flex space-x-4 gap-6">
                        <NavLink to='blogs'>My Blogs</NavLink>
                        {!loggedIn?<NavLink to='../login'>Login</NavLink>:<button onClick={logOut}>Logout</button>}
                        <NavLink to='profile'><img width="36" height="50" className="pb-2" src="https://img.icons8.com/ios-filled/50/2563eb/test-account.png" alt="test-account"/></NavLink>
                    </nav>
                </div>
            </header>
            <Outlet />

            {!isNewBlog && <Link to='newblog'>
                <div className="fixed bottom-4 right-4 cursor-pointer">
                    <div className="bg-blue-600 text-white rounded-full p-2 text-2xl h-12 w-12 flex items-center justify-center">
                        <span>+</span>
                    </div>
                </div>
            </Link>}
        </>
    )
}