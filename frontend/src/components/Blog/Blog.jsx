// src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Hero from "../Blog/Hero";
import NewsList from "../Blog/NewsList";
import Sidebar from "../Sidebar/Siderbar";
import Footer from "../Footer/Footer";
import { api } from "../config/api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState("");

  // Hàm trung tâm để gọi API
  const fetchBlogs = async (categoryId, keyword) => {
    setLoading(true);
    try {
      let url = "/blogs";
      
      // Logic chọn URL khớp với Spring Boot Controller của bạn
      if (categoryId && keyword) {
        url = `/blogs/category/${categoryId}/search?keyword=${keyword}`;
      } else if (categoryId) {
        url = `/blogs/category/${categoryId}`;
      } else if (keyword) {
        url = `/blogs/search?keyword=${keyword}`;
      }

      const res = await api.get(url);
      setBlogs(res.data.data || res.data);
    } catch (err) {
      console.error("Lỗi fetch:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Chạy lần đầu
  useEffect(() => {
    fetchBlogs(null, "");
  }, []);

  // Xử lý khi Sidebar hoặc Nút filter ở NewsList thay đổi
  const handleFilterChange = (id, key = currentKeyword) => {
    setActiveCategoryId(id);
    setCurrentKeyword(key);
    fetchBlogs(id, key);
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container pb-5 mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <NewsList 
              blogs={blogs} 
              loading={loading} 
              onCategorySelect={(id) => handleFilterChange(id, currentKeyword)} 
            />
          </div>
          <div className="col-lg-4">
            <Sidebar 
              onFilterChange={(id, key) => handleFilterChange(id, key)}
              activeCategoryId={activeCategoryId} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;