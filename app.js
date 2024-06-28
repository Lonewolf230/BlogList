const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const blogRouter=require('./controllers/blogs')
const rootRouter=require('./controllers/root')
const usersRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const middleware=require('./utils/middleware')
const config=require("./utils/config")

mongoose.set('strictQuery',false)

mongoose.connect(config.uri).then(res=>{
    console.log("Connection Successful");
})
.catch(err=>console.log("Connection Unsuccessful"))



app.use(cors())
app.use(express.json())

app.use("/",rootRouter)
app.use("/api/blogs",blogRouter)
app.use("/api/users",usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.errorHandler)


module.exports=app