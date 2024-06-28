import { Link, NavLink, Outlet,useLocation } from "react-router-dom"


export default function Home(){

    const location=useLocation()
    const path=location.pathname
    const isNewBlog= path==='/newblog'

    return(
        <>
            <header className="bg-blue-600 text-white text-2xl shadow-md h-20 p-2">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <NavLink to="/">Home</NavLink>
                    </div>
                    <nav className="flex space-x-4 gap-6">
                        <NavLink to='blogs'>My Blogs</NavLink>
                        <NavLink to='login'>Login</NavLink>
                        <NavLink to='profile'>Profile</NavLink>
                    </nav>
                </div>
            </header>
            <Outlet />

            {!isNewBlog && <Link to='newblog'>
                <div className="fixed bottom-4 right-4 cursor-pointer">
                    <div className="bg-white text-blue-600 rounded-full p-2 text-2xl h-12 w-12 flex items-center justify-center">
                        <span>+</span>
                    </div>
                </div>
            </Link>}
        </>
    )
}