require('dotenv').config()

// const uri=process.env.NODE_ENV==="test"
// ?process.env.TEST_MONGODB_URI:process.env.MONGODB_URI
// const port=process.env.PORT
let uri
if(process.env.NODE_ENV==='test')
    uri=process.env.TEST_MONGODB_URI
else if(process.env.NODE_ENV==='development')
    uri=process.env.MONGODB_URI
else if(process.env.NODE_ENV==='production')
    uri=process.env.PROD_MONGODB_URI

const port=process.env.PORT

module.exports={uri,port}