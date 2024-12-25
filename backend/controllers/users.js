
const { request } = require("../app")
const user = require("../models/user")
const User=require("../models/user")
const Blog=require("../models/blog")
const usersRouter=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const middleware=require('../utils/middleware')


usersRouter.post('/',async (request,response,next)=>{

    const {username,password,name}=request.body
    if(password.length<6){
        return response.status(400).json({error:"Password length is less than 6 characters"})
    }
    const saltRounds=10
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    //One way hashing passwords

    const user=new User({
        username:username,
        name:name,
        hashedPassword:hashedPassword,
    })

    try{
            const allUsers=await User.find({})
            const userExist=allUsers.find(user=>user.username===username)
            if(userExist)
                return response.status(400).json({error:"Username already exists"})
            else{
                const saveduser=await user.save()
                response.status(201).json(saveduser)
            }
        
    }
    catch(error){
        next(error)
    }
})

usersRouter.get('/',async (request,response,next)=>{
    const users=await User.find({}).populate('blogs',{title:1,author:1})
    response.json(users)
})

usersRouter.get('/profile/:id?',middleware.decodeandVerifyToken,async(request,response,next)=>{
    const decodedToken=request.decodedToken
    const id=decodedToken.id
    const blogId=request.params.id
    console.log(decodedToken);
    console.log(id);
    if(!decodedToken)
        return response.status(401).json({error:"Token missing"})
    try{
        let user
        if(!blogId){
            const username=decodedToken.username
            user=await User.findOne({username})
            console.log(user)
            
        }
        else{
            const blog=await Blog.findById(blogId)
            console.log(blog);
            const ownerId=blog.user.toString()
            user=await User.findById(ownerId)
        }
        console.log(user);
        if(!user)
            return response.status(404).json({error:"User not found"})

        return response.status(200).json(user)
    }
    catch(err){
        console.log(err);
    }
})



usersRouter.post('/:username/follow',middleware.decodeandVerifyToken,async(request,response,next)=>{
    const username=request.params.username
    const followerId=request.decodedToken.id
    try{
        const userToBeFollowed=await User.findOne({username:username})
        const userFollowing=await User.findById(followerId)

        console.log("Id of user to be followed",userToBeFollowed._id)
        console.log("Id of user following",userFollowing._id)

        if(!userToBeFollowed)
            return response.status(404).json({error:"User not found"})

        const followers=userToBeFollowed.followers
        const following=userFollowing.following

        if(followerId===userToBeFollowed._id.toString())
            return response.status(400).json({error:"You cannot follow yourself"})

        const followerIndex = userToBeFollowed.followers.indexOf(followerId);
        const followingIndex = userFollowing.following.indexOf(userToBeFollowed._id.toString());

        if(followerIndex!==-1){
            userToBeFollowed.followers.splice(followerIndex, 1);
            userFollowing.following.splice(followingIndex, 1);
        }
        else{
            followers.push(userFollowing._id)
            following.push(userToBeFollowed._id)
        }
        
        await userToBeFollowed.save()
        await userFollowing.save()

        response.status(200).json({userToBeFollowed,userFollowing})
    }
    catch(err){
        next(err)
    }
    
})

usersRouter.get('/:username/follow',async(request,response,next)=>{
    const username=request.params.username
    try{
        const user=await User.findOne({username:username})
        let followers=user.followers
        response.status(200).json(followers)
    }
    catch(err){
        next(err)
    }
})

usersRouter.get('/:username/following',async(request,response,next)=>{
    const username=request.params.username
    try{
        const user=await User.findOne({username:username})
        
        let following=user.following
        response.status(200).json(following)
    }
    catch(err){
        next(err)
    }
})



module.exports=usersRouter


