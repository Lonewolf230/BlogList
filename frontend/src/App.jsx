import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'

import './App.css'
import PublicBlogs from './Pages/PublicBlogs'
import Landing from './Pages/Landing'
import NavBar from './Pages/NavBar'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import NewBlog from './Pages/NewBlog'
import MyBlogs from './Pages/MyBlogs'
import SignUp from './Pages/SignUp'
import { AuthProvider } from './Auth/AuthProvider'
import Blog from './Pages/Blog'

function App() {
  const routerobj=createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Landing/>}/>
      <Route path='/main' element={<NavBar/>}>
          <Route index element={<PublicBlogs/>}/>
          <Route path=':id' element={<Blog/>}/>
          <Route path='profile' element={<Profile />}/>
          <Route path='newblog' element={<NewBlog/>} />
          <Route path='blogs' element={<MyBlogs/>}/>
        </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>}/>
      
    </>
  ))

  return (
    <>
      <AuthProvider>
        <RouterProvider router={routerobj} />
      </AuthProvider>
    </>
  )
}

export default App
