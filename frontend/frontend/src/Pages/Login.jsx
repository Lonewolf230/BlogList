import { Form } from "react-router-dom"

export default function Login(){


    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Form className="flex flex-col gap-10 p-5 bg-white shadow-md rounded" method="post">
            <h2 className="text-center text-blue-600 text-2xl font-black">Login</h2>
            <input
            className="border-black p-4 rounded w-80"
            name="username"
            type="text"
            placeholder="Enter Username"
            />
            <input
            className="border-black p-4 rounded w-80"
            name="password"
            type="password"
            placeholder="Enter Password"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Log In
            </button>

            <h3 className="text-blue-600 text-sm text-right cursor-pointer">New User? Sign Up</h3>
        </Form>
    </div>
        </>
    )
}