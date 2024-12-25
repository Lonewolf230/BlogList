
const app= require('./app')
const config=require('./utils/config')



app.listen(config.port,(request,response)=>{
    console.log(`Connected at port ${config.port}`)
})