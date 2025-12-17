import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../components/config/api";
import "../../assets/css/Blog.css";

// 1. Định nghĩa bảng màu mapping
const colorMap = {
  "Cấp cứu – An toàn": "#dc3545", // Danger (Đỏ)
  "Kỹ năng sinh tồn": "#0d6efd",  // Primary (Xanh biển)
  "Tin tức cứu hộ": "#198754",   // Success (Xanh lá)
  "Kiến thức cộng đồng": "#0dcaf0", // Info (Xanh nhạt)
  "Mặc định": "#6c757d"          // Secondary (Xám)
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/${id}`)
      .then(res => {
        setBlog(res.data.data || res.data);
      })
      .catch(err => console.error("Failed to load", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (!blog) return <div className="text-center mt-5">Không tìm thấy bài viết</div>;

  // 2. Lấy màu sắc dựa trên categoryName
  const categoryName = blog.category?.categoryName || "Mặc định";
  const themeColor = colorMap[categoryName] || colorMap["Mặc định"];

  return (
    <div className="bg-white min-vh-100 pb-5">
      <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
        
        {/* Nút Back - Đổi màu khi hover */}
        <button
          className="btn btn-link text-decoration-none mb-4 p-0 shadow-none hover-opacity"
          onClick={() => navigate(-1)}
          style={{ fontSize: '14px', fontWeight: 'bold', color: themeColor }}
        >
          ← BACK TO BLOGS
        </button>

        <div className="text-center mb-2">
          <span className="text-muted fw-bold uppercase" style={{ fontSize: '13px', letterSpacing: '2px' }}>
             {blog.time}
          </span>
        </div>

        {/* 3. Tiêu đề Đổi màu theo Category */}
        <h1 className="text-center mb-5 mt-2" 
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
              fontStyle: 'italic', 
              fontWeight: 900, 
              lineHeight: 1.1,
              color: themeColor, // <--- MÀU THAY ĐỔI Ở ĐÂY
              textTransform: 'uppercase'
            }}>
          {blog.title}
        </h1>

        <div className="mb-5 shadow-sm rounded overflow-hidden">
          <img 
            src={blog.image || "https://images.unsplash.com/photo-1544367563-12123d8965cd"} 
            alt={blog.title} 
            className="w-100"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        <div className="blog-content-wrapper" style={{ fontSize: '1.2rem', color: '#2d3436', lineHeight: '1.8' }}>
          
          <h2 className="fw-bold mb-4" style={{ fontSize: '1.75rem', borderLeft: `5px solid ${themeColor}`, paddingLeft: '15px' }}>
            {categoryName}
          </h2>

          <div style={{ whiteSpace: "pre-line", textAlign: 'justify' }} className="mb-5">
            {blog.content}
          </div>

          {/* Đường kẻ ngang đổi màu */}
          <hr className="my-5" style={{ opacity: 0.2, borderTop: `2px solid ${themeColor}` }} />
          
          {/* Badge cuối trang đổi màu */}
          <div className="text-center">
             <span className="badge rounded-pill px-4 py-2" style={{ backgroundColor: themeColor, fontSize: '0.9rem' }}>
                {categoryName.toUpperCase()}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;