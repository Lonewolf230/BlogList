const mongoose=require('mongoose')
const blog = require('./blog')
const user=require('./user')

const commentSchema=new mongoose.Schema({
    comment:String,
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    blog:{
        ref:'Blog',
        type:mongoose.Schema.Types.ObjectId
    }
},{timestamps:true})

commentSchema.set('toJSON',{
    transform:(document,returnedObj)=>{
        returnedObj.id=returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports=mongoose.model('Comment',commentSchema)