import { Form,redirect,useActionData } from "react-router-dom"

export async function action({request}){
    const formData=await request.formData()
    
    const blog={
            title:formData.get('title'),
            author:formData.get('author'),
            //content:formData.get('content')
        }
    try{
        //await axios.post('http://localhost:4001/api/blogs',blog)
        const response=redirect('../blogs')
        response.body=true
        return response
    }
    
    catch(error){
        return {error:error.message}
    }


}

export default function NewBlog(){


    return(
        <>
            <Form className="flex flex-col items-center p-10 gap-6" method="post" replace>
                <h2 className="text-white font-bold text-3xl">Add a New blog</h2>

                <input type="text" name="title" placeholder="Enter title" className="p-4 rounded-xl"/>
                <input type="text" name="author" placeholder="Enter Author's Name" className="p-4 rounded-xl"/>
                <textarea cols="50" rows="50"  id="content" name="content"
                className="h-64 p-8 rounded-3xl"  placeholder="Write your Content"></textarea>



                <button className="bg-white text-blue-600 font-bold p-3 rounded-xl">Upload Blog</button>

                
                

            </Form>
        </>
    )
}