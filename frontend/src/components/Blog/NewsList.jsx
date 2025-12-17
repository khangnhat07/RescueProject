import React, { useEffect, useState } from "react";
import NewsCard from "./Newscard.jsx";
import { api } from "../../components/config/api.js";
import "../../assets/css/Blog.css";

const NewsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Hàm fetch blog (tất cả hoặc theo category)
  const fetchBlogs = (categoryId = null) => {
    setLoading(true);

    const url = categoryId
      ? `/blogs/category/${categoryId}`
      : `/blogs`;

    api.get(url)
      .then(res => {
        setBlogs(res.data.data);
      })
      .catch(err => {
        console.error("Failed to load blogs", err);
      })
      .finally(() => setLoading(false));
  };

  // 🔹 Load tất cả blog khi vào trang
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Đang tải bài viết...</p>;
  }

  return (
    <div>
      {/* ALERT */}
      <div className="alert alert-danger d-flex align-items-center shadow-sm">
        <i className="fas fa-exclamation-triangle fa-2x me-3"></i>
        <div>
          <h5 className="alert-heading fw-bold mb-1">
            CẢNH BÁO KHẨN CẤP
          </h5>
          <p className="mb-0 small">
            Vui lòng theo dõi các thông báo mới nhất.
          </p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="d-flex gap-2 mb-4 overflow-auto">
        <button
          className="btn btn-dark btn-sm rounded-pill px-3"
          onClick={() => fetchBlogs()}
        >
          Tất cả
        </button>

        <button
          className="btn btn-outline-danger btn-sm rounded-pill px-3"
          onClick={() => fetchBlogs(1)}
        >
          Cấp cứu – An toàn
        </button>

        <button
          className="btn btn-outline-primary btn-sm rounded-pill px-3"
          onClick={() => fetchBlogs(2)}
        >
          Kỹ năng sinh tồn
        </button>

        <button
          className="btn btn-outline-info btn-sm rounded-pill px-3"
          onClick={() => fetchBlogs(3)}
        >
          Kiến thức cộng đồng
        </button>

        <button
          className="btn btn-outline-success btn-sm rounded-pill px-3"
          onClick={() => fetchBlogs(4)}
        >
          Tin tức cứu hộ
        </button>
      </div>

      <div className="d-flex flex-column gap-4">
        {blogs.map(blog => (
          <NewsCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
