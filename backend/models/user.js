const mongoose=require('mongoose')
const comment = require('./comment')


//one-to-many relationship b/w user and blogs
const userSchema=mongoose.Schema({
    username:{
        type:String,
        minLength:3,
        required:true,
        unique:true,//Make sure db is healthy beforehand to make this work
    },
    hashedPassword:{
        type:String,
    },
    name:{
        type:String,
        default:"Guest",
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]  
})

userSchema.set('toJSON',{
    transform:(document,returnedObj)=>{
        returnedObj.id=returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.hashedPassword//Do not reveal passwords
    }
})

module.exports=mongoose.model("User",userSchema)