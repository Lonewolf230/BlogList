import { Link,useSearchParams,useNavigate,NavLink } from "react-router-dom"
import axios from 'axios'
import { useEffect,useState } from "react"

export default function PublicBlogs(){
    const baseUrl='/api/blogs'
    const navigate=useNavigate()
    const [blogs,setBlogs]=useState([])

    async function getBlogs(){
        try{
            const result=await axios.get(baseUrl,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result.data)
            // const blogsReturned = [
            //     { id: '1', title: 'Sample Blog 1', author: 'Author 1', content: 'Content 1' },
            //     { id: '2', title: 'Sample Blog 2', author: 'Author 2', content: 'Content 2' }
            // ];
            const blogsReturned=result.data
            return blogsReturned
        }
        catch(err){
            console.log(err);
        }
    }

    function truncateString(str,num){
        if(str.length<=num)
            return str
        return str.slice(0,num)+'...'
    }

    function handleClick(id){
        navigate(`/main/${id}`)
    }
    
    useEffect(()=>{
        try{
            const fetchBlogs=async ()=>{
                const blogsFetched=await getBlogs()
                console.log(blogsFetched);
                setBlogs(blogsFetched)
            }
            fetchBlogs()
        }
        catch(err){

        }
    },[])
    return (
        <>
            <div className="grid grid-cols-2 gap-6">
                {Array.isArray(blogs) && blogs.length>0 ? (blogs.map(blog=>{
                    return(  
                        <div className="flex flex-col p-6 bg-slate-100 mx-5 my-8 rounded-2xl poppins-regular" key={blog.id}>
                            <h1 className="text-center text-blue-500 font-extrabold">{blog.title}</h1>
                            <h4 className="text-right mr-5">-By <NavLink to={`${blog.id}/profile`} className={({isActive})=>{
                        isActive? 'text-blue-600 underline':'text-blue-600'
                    }}>{blog.author}</NavLink></h4>
                            <p>{truncateString(blog.content,100)}</p>
                            <button  className="text-right text-blue-500" onClick={()=>handleClick(blog.id)}>Expand</button>
                        </div>
                    )
                })):""}
            </div>
        </>
    )
}


// const publicBlogs=[{
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"6578"
    // },
    // {
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"9489"
    // },
    // {
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"1235"
    // },   
    // {
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"7754"
    // },
    // {
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"0978"
    // },
    // {
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"8754"
    // }]