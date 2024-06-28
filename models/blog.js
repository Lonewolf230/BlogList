const mongoose=require('mongoose')


const blogSchema=new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  author: {
   type: String,
   required:true
  },
  likes: {
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Schema.Types.ObjectId, //Referencing Users in blogs collection
    ref:"User"
  }
})


blogSchema.set('toJSON',{
    transform:(document,returnedObj)=>{
        returnedObj.id=returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports=mongoose.model('Blog',blogSchema)