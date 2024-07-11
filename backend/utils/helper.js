const _ = require("lodash")


const dummy=(blogs)=>{

    return 1
}


const sum_likes=(blogposts)=>{
    let likes=0
    blogposts.forEach(blog=>{
        likes+=blog.likes
    })
    return likes
}

const favouriteBlogs=(blogposts)=>{

    return blogposts.reduce((favorite,current)=>{
        return current.likes>favorite.likes?current:favorite
    },blogposts[0])
}

const mostBlogs=(blogposts)=>{
    const authorCount=_.countBy(blogposts,'author')
    const maxBlogsAuthor= _.maxBy(_.keys(authorCount),(author)=>authorCount[author])
    return maxBlogsAuthor
}

module.exports={dummy,sum_likes,favouriteBlogs,mostBlogs}