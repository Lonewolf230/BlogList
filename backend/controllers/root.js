const rootRouter=require('express').Router()


rootRouter.get("/",(request,response)=>{
    response.send("Welcome to the API")
})

module.exports=rootRouter