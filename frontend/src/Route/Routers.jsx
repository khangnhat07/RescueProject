import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blog from '../components/Blog/Blog'
import BlogDetail from '../components/Blog/BlogDetail'
import Layout from "../components/Admin/Layout";
import Dashboard from "../components/Admin//pages/Dashboard";
import SosTable from "../components/Admin//pages/SosTable";
import BlogManagement from '../components/Admin/pages/BLogManagement';
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin" element={<Layout />}>
          {/* Khi vào /admin sẽ tự động chuyển hướng hoặc hiện Dashboard */}
          <Route index element={<Dashboard />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sos" element={<SosTable />} />
          <Route path="blogs" element={<BlogManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
