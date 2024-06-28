
const user = require("../models/user")
const User=require("../models/user")
const usersRouter=require('express').Router()
const bcrypt=require('bcrypt')


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
            const saveduser=await user.save()
            response.status(201).json(saveduser)
        
    }
    catch(error){
        next(error)
    }
})

usersRouter.get('/',async (request,response,next)=>{
    const users=await User.find({}).populate('blogs',{title:1,author:1})
    response.json(users)
})

module.exports=usersRouter


