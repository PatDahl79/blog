import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import BlogInfo from './pages/blogInfo/BlogInfo';
import UserLogin from './pages/userPage/userLogin/UserLogin';
import UserCreateBlog from './pages/userPage/userCreateBlog/UserCreateBlog';
import UserDashboard from './pages/userPage/userDashboard/UserDashboard';
import UserCreateProfile from './pages/userPage/userCreateProfile/UserCreateProfile';
import Nopage from './pages/nopage/Nopage';
import AllBlogs from './pages/allBlogs/AllBlogs';
import BlogPostCard from './Components/blogPostCard/BlogPostCard';
import MyState from './context/myState';
import { Toaster } from "react-hot-toast"
import UserRegister from './pages/userPage/userRegister/UserRegister';


function App() {

  return (
    <MyState>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/allBlogs" element={<AllBlogs/>} />
        <Route path="/blogPostCard" element={<BlogPostCard />} />
        <Route path="/userCreateBlog" element={<UserCreateBlog />} />
        <Route path="/blogInfo/:id" element={<BlogInfo />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userCreateProfile" element={<UserCreateProfile/>} />
        <Route path="/*" element={<Nopage />} />
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  )
}

export default App

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  if (admin?.user?.email === "user.admin@gmail.com") {
    return children
  }
  else {
    return <Navigate to={'/userLogin'} />
  }
}