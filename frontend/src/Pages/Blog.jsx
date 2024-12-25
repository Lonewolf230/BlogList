
import { useState,useRef,useEffect } from "react"
import Popup from "../Utils/Popup"
import axios from 'axios'
import { useLocation,useParams } from "react-router-dom"

export default function Blog(){
    
    // const blog={
    //     title:"Sample Blog",
    //     author:"Author",
    //     likes:28,
    //     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     username:"author1234",
    //     createdAt:"12:02:56 am",
    //     id:"8754"
    // }
    const {id}=useParams()
    // const blog= axios.get(`/api/blogs/${id}`,{
    //     headers:{
    //         'Authorization':`Bearer ${localStorage.getItem('token')}`
    //     }}
    // ).then(res=>res.data).catch(err=>console.log(err))
    const [iblog,setIblog]=useState({blog:{},view:true})
    

    

    const [like,setLike]=useState({isLiked:iblog.blog.liked,count:iblog.blog.likes})
    
    const view=useRef(false)
    const [,forceUpdate]=useState(0)
    
    const [comment,setComment]=useState('')
    const [comments,setComments]=useState(iblog.blog.comments)

    const toggleLike=async ()=>{

        try {
            const newLikeStatus = !like.isLiked;
            const newLikeCount = newLikeStatus ? like.count + 1 : like.count - 1;

            await axios.put(`/api/blogs/${id}`, { ...iblog.blog, likes: newLikeCount,liked:newLikeStatus }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setLike({ isLiked: newLikeStatus, count: newLikeCount });
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleComment=(e)=>{
        setComment(e.target.value)
    }
    const addComment=async ()=>{
        try{
            await axios.post(`/api/comments/${id}`,{comment},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            setComments(prev=>[...prev,comment])
            setComment('')
        }
        catch(err){

        }
    }
    const handleView=async ()=>{
        view.current=!view.current
        if(view.current){
            const comments=await axios.get(`/api/comments/${id}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(comments.data);
            setComments(comments.data)
        }
        forceUpdate(n=>n+1)
    }
    
    
    const getBlog=async()=>{
        const blog=await axios.get(`/api/blogs/${id}`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }})
        console.log(blog.data)
        return blog.data
    }
    useEffect(()=>{
        try{
        const fetchBlog=async()=>{
            const blogFetched=await getBlog()
            console.log(blogFetched)
            setIblog(prev=>({
                ...prev,
                blog:blogFetched
            }))
            setLike(prev => ({
                ...prev,
                isLiked: blogFetched.liked,
                count: blogFetched.likes
            }));
            setComments(blogFetched.comments || []);
            
        }
        fetchBlog()
    }
    catch(err){
        console.log(err)
    }
    },[id])

    
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
                        <div key={comment.id} className="bg-slate-100 w-4/5 px-6 py-3 rounded-lg">
                            <h2 className="float-left text-blue-600 font-bold">{comment.user.username}</h2>
                            <br />
                            <br />
                            <p>{comment.comment}</p>
                        </div>
                    )):""}
            </div>

            
            
        </>)}

    





{/* <div className='flex flex-col bg-gray-200 p-8 mx-72 mt-14 rounded-xl gap-5 font-bold'>
                        <h2 >USERNAME :{user.username}</h2>
                        <h2>NAME : {user.name}</h2>
                        <h3>No of Blogs posted : {user.blogs.length}</h3>
                        <h3>Followers: {user.followers.length}</h3>
                        <h3>Following: {user.following.length}</h3>
                    </div> */}