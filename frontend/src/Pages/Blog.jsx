
import { useState,useRef } from "react"
import Popup from "../Utils/Popup"

export default function Blog(){
    
    const blog={
        title:"Sample Blog",
        author:"Author",
        likes:28,
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username:"author1234",
        createdAt:"12:02:56 am",
        id:"8754"
    }
    const [iblog,setIblog]=useState({blog:blog,view:true})
    

    const initalComments=["comment1","comment2","comment3","comment4","comment5"]

    const [like,setLike]=useState({isLiked:false,count:iblog.blog.likes})
    
    const view=useRef(false)
    const [,forceUpdate]=useState(0)
    
    const [comment,setComment]=useState('')
    const [comments,setComments]=useState(initalComments)
    const toggleLike=()=>{
        let updatedCount=like.isLiked? like.count-1:like.count+1
        setLike(prev=>({
            ...prev,
            isLiked:!like.isLiked,
            count:updatedCount
        }))
    }
    
    const handleComment=(e)=>{
        setComment(e.target.value)
    }
    const addComment=()=>{
        setComments(prev=>[...prev,comment])
        setComment('')
    }
    const handleView=()=>{
        view.current=!view.current
        forceUpdate(n=>n+1)
    }
    

    
    console.log(comment)

    
    return(
        
        <>
            <div className="flex flex-col p-12 justify-center bg-slate-200 my-9 mx-24 rounded-xl poppins-regular">
                <h1 className="text-blue-500 font-black text-center text-2xl">{iblog.blog.title}</h1>
                <h4 className="text-right mr-5">-By {iblog.blog.author}</h4>
                <p className="my-10">{iblog.blog.content}</p>
                <div className="flex gap-12">
                <button
                    onClick={toggleLike}
                    className={`flex items-center space-x-2 ${like.isLiked ? "text-red-500" : "text-gray-500"}`}
                >
                    <span className={`${like.isLiked ? 'material-symbols-rounded' : 'material-symbols-outlined'} border-none`}>
                    favorite
                    </span>
                    <span>{like.count}</span>
                </button>
                

                    
                    
                </div>
            </div>
            <div className="flex gap-4 ">
                <input type="text" className="border-none py-2 px-4 w-3/5 h-14 ml-24" placeholder="Add a Comment" name="comment" id="comment" value={comment}onChange={handleComment} />
                <button className="bg-black text-white py-1 px-4 rounded-lg" onClick={addComment}>Add</button>
            </div>    
                <br />
                <br />
                <button className="p-4 rounded-2xl bg-blue-600 text-white ml-24 w-fit" onClick={handleView}>{view.current? `Collapse`: `View Comments`}</button>

            <div className="flex flex-col gap-5 mt-10 ml-24 poppins-regular pb-10">
                {view.current ? 
                    comments.map(comment=>(
                        <div key={comment} className="bg-slate-100 w-4/5 px-6 py-3 rounded-lg">{comment}</div>
                    )):""}
            </div>

            
            
        </>)}

    
