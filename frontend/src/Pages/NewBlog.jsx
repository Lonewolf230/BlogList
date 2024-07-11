import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../Auth/AuthProvider"


export default function NewBlog(){

    const {loggedIn}=useContext(AuthContext)
    const [blogData,setBlogData]=useState({title:"",author:'',content:"",isPublic:false})

    const navigate=useNavigate()
    const handleSubmit =async (e)=>{

        e.preventDefault()
        

        navigate('../blogs')
    }

    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target
        setBlogData(prev=>({
            ...prev,
            [name]:type==="checkbox"?checked:value
        }))
    }

    return(
        
        <>
            {loggedIn?(
                <form className="flex flex-col items-center p-10 gap-6 bg-gray-200 shadow-md " method="post"  onSubmit={handleSubmit} replace>
                    <h2 className="text-blue-600 font-bold text-3xl">Add a New blog</h2>

                    <input type="text" name="title" value={blogData.title} onChange={handleChange} placeholder="Enter title" className="p-4 rounded-xl"/>
                    <input type="text" name="author" value={blogData.author} onChange={handleChange} placeholder="Enter Author's Name" className="p-4 rounded-xl"/>
                    <textarea cols="50" rows="50" value={blogData.content} id="content" name="content" onChange={handleChange}
                    className="h-64 p-8 rounded-3xl"  placeholder="Write your Content" />

                    
                    <label htmlFor="public" className="flex items-center">
                        <input
                        type="checkbox"
                        id="public"
                        checked={blogData.isPublic}
                        onChange={handleChange}
                        className="form-checkbox h-6 w-6 text-blue-600 rounded-md"
                        name="isPublic"
                        />
                        <span className="ml-2 text-blue-600">Public Blog</span>
                    </label>

                    <button className="bg-blue-600 text-white font-bold p-3 rounded-xl">Upload Blog</button>
                </form>
            ):(
                <>
                    <div className="flex flex-col items-center justify-center  min-h-screen ">
                        <h1 className="text-blue-600 text-4xl font-black mb-6">Please Log In to your Account to continue writing your blogs</h1>
                        <NavLink  to='../login' className="hover:underline hover:cursor-pointer text-2xl">Log In</NavLink>
                    </div>
                </>
            )
            
            }
        </>
    
    
    
    )

}


// export async function action({request}){
//     const formData=await request.formData()
    
//     const blog={
//             title:formData.get('title'),
//             author:formData.get('author'),
//             //content:formData.get('content')
//         }
//     try{
//         //await axios.post('http://localhost:4001/api/blogs',blog)
//         const response=redirect('../blogs')
//         response.body=true
//         return response
//     }
    
//     catch(error){
//         return {error:error.message}
//     }


// }