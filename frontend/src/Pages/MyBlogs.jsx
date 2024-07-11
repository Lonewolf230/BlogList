import { useContext, useState } from "react"
import AuthContext from "../Auth/AuthProvider"
import { NavLink,useLocation,Link } from "react-router-dom"

export default function MyBlogs(){

    const location=useLocation()
    const path=location.pathname
    const isNewBlog= path==='/newblog'
    const {loggedIn}=useContext(AuthContext)


    const myBlogs=[{
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"6578"
    },
    {
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"9489"
    },
    {
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"1235"
    },   
    {
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"7754"
    },
    {
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"0978"
    },
    {
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"8754"
    }]

    const [like,setLike]=useState(false)
    const toggleLike=()=>{

    }

    return(
        
        <>
            {loggedIn? (
                myBlogs.map(blog=>(
                <>
                <div className="flex flex-col p-12 justify-center bg-slate-200 my-9 mx-24 rounded-xl poppins-regular" key={blog.id}>
                    <h1 className="text-blue-500 font-black text-center text-2xl">{blog.title}</h1>
                    <h4 className="text-right mr-5">-By {blog.author}</h4>
                    <p className="my-10">{blog.content}</p>
                    <div className="flex gap-12">
                        <button onClick={toggleLike}><span className="material-symbols-outlined border-none">favorite</span><span>{like.count}</span></button>
                    </div>
                    
                </div>
                </>
            ))):(
                <div className="flex flex-col items-center justify-center  min-h-screen ">
                        <h1 className="text-blue-600 text-4xl font-black mb-6">Please Log In to your Account to view your blogs</h1>
                        <NavLink  to='../../login' className="hover:underline hover:cursor-pointer text-2xl">Log In</NavLink>
                </div>
            )}

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

