const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require("../models/user")
require('dotenv').config()
const loginRouter=require('express').Router()

loginRouter.post('/',async(request,response)=>{
    const {username,password}=request.body

    const user= await User.findOne({username:username})
    const passwordCorrect=user===null? false:
                            await bcrypt.compare(password,user.hashedPassword)

    if(!(user && passwordCorrect)){
        return response.status(401).json({error:"Invalid Username / password"})
    }

    const userToken={
        username:user.username,
        id:user._id,
    }

    //digitally signed jwt token
    const token=jwt.sign(userToken,process.env.SECRET,{expiresIn:60*30})

    //user forced to re-login after 30 minutes
    response.status(200).send({token,username:user.username,name:user.name})
})

module.exports=loginRouter