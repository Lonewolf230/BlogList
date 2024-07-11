const blogRouter=require('express').Router()
const { request, response } = require('express')
const Blog=require('../models/blog')
const User=require("../models/user")

const middleware=require('../utils/middleware')
const jwt=require('jsonwebtoken')
require('dotenv').config()



blogRouter.get('/',async (request, response,next) =>{
      const query=request.query
    try{
      console.log(query)
      let blogs
      if(query.public==='true')
        blogs=await Blog.find({public:true}).populate('user',{username:1,name:1})
      else
        blogs=await Blog.find({}).populate('user',{username:1,name:1})
        
      response.json(blogs)
    }
    catch(error){
      next(error)
    }
  })
  


blogRouter.get('/:username',middleware.decodeandVerifyToken,async(request,response,next)=>{
  
  const query=request.query
  
  try{
    
    // let decodedToken;
    //     try {
    //         decodedToken = middleware.decodeandVerifyToken(request);
    //     } catch (err) {
    //         if (err.name !== 'JsonWebTokenError' && err.name !== 'TokenExpiredError') {
    //             return next(err);
    //         }
    //     }
    //const decodedToken=middleware.decodeandVerifyToken(request)
    const user=await User.findOne({username:request.params.username})
    if(!user)
      return response.status(404).json({error:"User Not found"})
    if(request.decodedToken.id.toString() !== user._id.toString()){
      return response.status(403).json({error:"You are not authorised to access this page"})
    }
    let blogs
    if(query.public==='true')
      blogs=await Blog.find({user:user._id,public:true}).populate('user',{username:1})
    else
      blogs=await Blog.find({user:user._id}).populate('user',{username:1})

    response.json(blogs)
  }
  catch(err){
    next(err)
  }
})

blogRouter.post('/',middleware.decodeandVerifyToken,async (request, response,next) => {
  try{
    const body=request.body

    //adding a new blog only if user has a valid token(post request)

    //const decodedToken= middleware.decodeandVerifyToken(request)
    const decodedToken=request.decodedToken
    const user=await User.findById(decodedToken.id)

    const blog=new Blog({
      title:body.title,
      author:body.author,
      likes:body.likes,
      user:user._id,
      public:body.public,
    })

    
      const blog_added=await blog.save()

      user.blogs=user.blogs.concat(blog_added.id)
      await user.save()//can user findByIdandUpdate for better performance 

      response.status(201).json(blog_added) 
  }
    catch(err){
      next(err)
    } 
  })

blogRouter.delete('/:id',middleware.decodeandVerifyToken,async (request,response,next)=>{
    try{
    //const decodedToken=middleware.decodeandVerifyToken(request)
      const decodedToken=request.decodedToken

    const blog=await Blog.findById(request.params.id)
    if(blog.user.toString() !== decodedToken.id.toString())
      return response.status(403).json({error:'You do not have the permission to delete this user'})
    
    const del_blog=await Blog.deleteOne({_id:request.params.id})
    if(del_blog.deletedCount===1){
        response.status(204).send()
        console.log("Deleted Successfully");
      }
      else{
        response.status(404).send("Blog Not found")
      }
    }


    catch(err){
     next(err) 
    }
  
  })

blogRouter.put('/:id',async (request,response)=>{
  //creating a new Model instance doesnt work as it will have a different _id 
  const id=request.params.id
  const blog={
    title:request.body.title,
    author:request.body.author,
    likes:request.body.likes,
    public:request.body.public,
  }

  const updated_obj=await Blog.findByIdAndUpdate({_id:id},blog,{new:true})
  response.json(updated_obj)
})



module.exports=blogRouter