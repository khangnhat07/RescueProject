import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blog from '../components/Blog/Blog'
import BlogDetail from '../components/Blog/BlogDetail'
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
