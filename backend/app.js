const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
 const blogRouter=require('./controllers/blogs')
 const rootRouter=require('./controllers/root')
const usersRouter=require('./controllers/users')
 const loginRouter=require('./controllers/login')
const commentRouter=require('./controllers/comments')
 const middleware=require('./utils/middleware')
 const config=require("./utils/config")
const path=require('path')



mongoose.set('strictQuery',false)

mongoose.connect(config.uri).then(res=>{
    console.log("Connection Successful");
})
.catch(err=>console.log("Connection Unsuccessful"))

app.use(express.static(path.join(__dirname, 'dist')))

// app.use(express.static('dist'))
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   });

app.use("/",rootRouter)
app.use('/api/login',loginRouter)

app.use("/api/users",usersRouter)

app.use("/api/blogs",blogRouter)

app.use('/api/comments',middleware.decodeandVerifyToken,commentRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.errorHandler)


module.exports=app