const commentRouter=require('express').Router()
const Comment=require('../models/comment');
const Blog=require('../models/blog');
const User=require('../models/user');
const middleware=require('../utils/middleware')


commentRouter.get('/:id',async(request,response,next)=>{
    try{
        const blog=await Blog.findById(request.params.id)
        const comments=await Comment.find({blog:blog.id}).populate('user',{username:1,name:1})
        response.json(comments)
    }
    catch(err){
        next(err)
    }
})

commentRouter.post('/:id',async(request,response,next)=>{
    try{
        const decodedToken=middleware.decodeandVerifyToken(request,response)
        
        const comment=new Comment({
            comment:request.body.comment,
            user:decodedToken.id,
            blog:request.params.id
        })

        const blog=await Blog.findById(request.params.id)
        if(!blog)
            return response.status(404).json({error:"Blog not found"})

        const user=await User.findById(decodedToken.id)
        if(!user)
            return response.status(404).json({error:"User not found"}) 
        
        const commentAdded=await comment.save()

        blog.comments=blog.comments.concat(commentAdded._id)
        await blog.save()
        user.comments=user.comments.concat(commentAdded._id)
        await user.save()

        response.json(commentAdded)
    }
    catch(err){
        next(err)
    }
})

module.exports=commentRouter;