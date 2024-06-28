const blogRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require("../models/user")
const middleware=require('../utils/middleware')
const jwt=require('jsonwebtoken')
require('dotenv').config()



blogRouter.get('/',async (request, response) => {
    const blogs=await Blog.find({}).populate('user',{username:1,name:1})
    response.json(blogs)
  })
  
blogRouter.post('/',async (request, response,next) => {
  try{
    const body=request.body

    //adding a new blog only if user has a valid token(post request)

    const decodedToken= middleware.decodeandVerifyToken(request)

    const user=await User.findById(decodedToken.id)

    const blog=new Blog({
      title:body.title,
      author:body.author,
      likes:body.likes,
      user:user._id,
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

blogRouter.delete('/:id',async (request,response,next)=>{
    try{
    const decodedToken=middleware.decodeandVerifyToken(request)


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
    url:request.body.url,
    likes:request.body.likes,
  }

  const updated_obj=await Blog.findByIdAndUpdate({_id:id},blog,{new:true})
  response.json(updated_obj)
})

module.exports=blogRouter