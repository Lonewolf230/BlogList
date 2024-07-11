const mongoose=require('mongoose')

const uri="mongodb+srv://manish:manish@atlascluster.i8srvhz.mongodb.net/testdb?retryWrites=true&w=majority&appName=AtlasCluster"


mongoose.set('strictQuery',false)
mongoose.connect(uri).then(res=>{
    console.log("Connection Successful");
})
.catch(err=>console.log("Connection Unsuccessful"))

const blogSchema=new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })

  blogSchema.set('toJSON',{
    transform:(document,returnedobj)=>{
        returnedobj.id=returnedobj._id.toString()
        delete returnedobj._id
        delete returnedobj.__v
    }
})

const Blog= mongoose.model("Blog",blogSchema)

// blogSchema.set('toJSON',{
//     transform:(document,returnedobj)=>{
//         returnedobj.id=returnedobj._id.toString()
//         delete returnedobj._id
//         delete returnedobj.__v
//     }
// })

if(process.argv[3]&&process.argv[4]
    &&process.argv[5]&&process.argv[6]){

        const blog=new Blog({
            title:process.argv[3],
            author:process.argv[4],
            url:process.argv[5],
            likes:process.argv[6],
        })

        blog.save().then(response=>{
            console.log("Added succesfully");
            mongoose.connection.close()
        })

        
    }
