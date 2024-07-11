const jwt=require('jsonwebtoken')
require('dotenv').config()
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'unique username expected' })
    }
    else if(error.name==='JsonWebTokenError'){
      return response.status(401).json({error:'Invalid token'})
    }
    else if(error.name==='TokenExpiredError'){
      return response.status(401).json({error:'Token Expired'})
    }
  
    next(error)
  }

  const getTokenFrom=(request) =>{//Separates token from auth header
    const auth=request.get('authorization')
    if(auth && auth.startsWith('Bearer '))
      return auth.replace('Bearer ','')
    else{
      return null
    }
  }

  const decodeandVerifyToken= (request,response,next)=>{
    try{
      const token=getTokenFrom(request)
      console.log(token)
      const decodedToken= jwt.verify(token,process.env.SECRET)//sync version returns the payload else error
      if(!decodedToken.id)
        return response.status(401).json({error:"Invalid token"})
      
      request.decodedToken=decodedToken
      next()
      
    }
    catch(err){
      if(err.name==='TokenExpiredError')
        return response.status(401).json({error:'Token Expired'})
      next(err)
      
    }
  
     
    
  }
module.exports={errorHandler,decodeandVerifyToken,getTokenFrom}

//Can use cookies instead of auth header
//Can use server side session by storing tokens in a key-value db like redis