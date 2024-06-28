const mongoose=require('mongoose')

const app=require('../app')
const supertest=require('supertest')

const Blog=require('../models/blog')
const User=require('../models/user')

const blogs=require("./blog_api_helper")
const helper=require("./test_helper")
const bcrypt=require('bcrypt')
const api=supertest(app)
mongoose.set('bufferTimeoutMS',25000)


beforeAll(async ()=>{
   await Blog.deleteMany({})
   let blog=new Blog(blogs[0])
   await blog.save()

   blog=new Blog(blogs[1])
   await blog.save()

})

describe('Get req tests',()=>{
    test('get all blogs',async ()=>{
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)
    },10000)

     test('checking blogs length after get',async ()=>{
        const response=await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(2)
     })

    test('checking presence of id',async ()=>{
        const response=await api.get('/api/blogs')
        
        expect(response.body[0]._id).toBeDefined()
    })
})

describe('Post req tests',()=>{
    let token
    beforeAll(async ()=>{
        const loginResponse=await api.post('/api/login').send({username:"root",password:"pwd"})
        .expect(200)

        token=loginResponse.body.token
        console.log(`Bearer ${token}`)
    })

    test('checking length of blogs after post',async ()=>{

        const response=await api.get('/api/blogs').set('Authorization',`Bearer ${token}`).expect(200)
        const len=response.body.length
        const new_blog={
            title:"Blog3",
            author:"author3",
            url:"www.blog3.com",
            likes:13
        }
        const post_res=await api.post('/api/blogs').set('Authorization',`Bearer ${token}`)
        .send(new_blog).expect(201).expect('Content-type',/application\/json/)
        
        const final_length=await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
        expect(final_length.body.length).toBe(len+1)
    })

    test('Unauthorised user', async()=>{
        const new_blog={
            title:"Blog3",
            author:"author3",
            url:"www.blog3.com",
            likes:13
        }
        const response= await api.post('/api/blogs').send(new_blog).expect(401)
        //expect(response.error.message).toMatch('Invalid token')
    })

    test('Number of likes',async ()=>{
        
        const new_blog={
            title:"Blog3",
            author:"author3",
            url:"www.blog3.com",
        }
        await api.post('/api/blogs')
        .send(new_blog)
        .expect(201)
        .expect("Content-type",/application\/json/)

        const listofBlogs=await Blog.find({})
        const posted_blog=listofBlogs[listofBlogs.length-1]
        expect(posted_blog.likes).toBe(0)

    })
    test('Missing title',async ()=>{
        const new_blog={
            
            author:"author3",
            url:"www.blog3.com",
            likes:48,
        }

        await api.post('/api/blogs').send(new_blog).expect(400).expect('Content-type',/application\/json/)

    })
    test("Missing url",async ()=>{
        const new_blog={
            title:"title3",
            author:"author3",
            likes:48,
        }

        await api.post('/api/blogs').send(new_blog).expect(400).expect('Content-type',/application\/json/)
    })

    test('Updated Likes',async()=>{
        const test_post_obj=blogs[0]
        try{
            const test_post=await api.post('/api/blogs').send(test_post_obj)
            expect(test_post.status).toBe(201)
            console.log("test post",test_post.body);

            const updated_blog={
                title:test_post_obj.title,
                author:test_post_obj.author,
                url:test_post_obj.url,
                likes:100
            }
            const id=test_post.body.id
            console.log(id)
            
            const updated_obj=await api.put(`/api/blogs/${id}`).send(updated_blog)
            console.log("updated obj",updated_obj.body)
            expect(updated_obj.status).toBe(200)
            //expect('Content-type',/application\/json/)

            expect(updated_obj.body.likes).toBe(updated_blog.likes)
        }
        catch(err){
            console.log(err.message)
        }
    },20000)

})

describe('When we have a single user',()=>{
    beforeEach(async()=>{
        await User.deleteMany({})//Cleaning up DB
        const hashedPassword=await bcrypt.hash('pwd',10)
        const user=new User({username:"root",hashedPassword,name:"Rootuser"})
        await user.save()
    })

    test('successful creation of new user',async ()=>{
        const users_bef=await helper.usersInDb()
        const newUser={
            username:"manish23",
            name:"manish",
            password:"okokok",
        }

        await api.post("/api/users").send(newUser).expect(201)
        .expect('Content-Type',/application\/json/)

        const users_aft=await helper.usersInDb()
        
        expect(users_aft.length).toBe(users_bef.length+1)
        const usernames=users_aft.map(user=>user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('If username already exists',async ()=>{
        const users=await helper.usersInDb()

        const newUser={
            username:"root",
            name:"blahblah",
            password:"okokok",
        }

        const response=await api.post('/api/users').send(newUser).expect(400)//badRequest
        .expect("Content-Type",/application\/json/)

        const users_after=await helper.usersInDb()
        expect(response.body.error).toMatch('unique username expected')
        expect(users.length).toBe(users_after.length)
    })
})



afterAll(async()=>{
    await mongoose.connection.close()
})