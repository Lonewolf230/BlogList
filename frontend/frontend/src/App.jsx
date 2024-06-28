import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import NewBlog,{action as blogAction} from './Pages/NewBlog'
import MyBlogs from './Pages/MyBlogs'

function App() {
  const routerobj=createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<Home/>}>
        <Route path='profile' element={<Profile />}/>
        <Route path='newblog' element={<NewBlog/>} action={blogAction}/>
        <Route path='blogs' element={<MyBlogs/>}/>
      </Route>
      <Route path='/login' element={<Login/>} />
      
    </>
  ))

  return (
    <>
      <RouterProvider router={routerobj}/>
    </>
  )
}

export default App
