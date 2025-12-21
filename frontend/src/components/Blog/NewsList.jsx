// src/pages/Blog/NewsList.jsx
import React from "react";
import NewsCard from "./Newscard.jsx";
import "../../assets/css/Blog.css";

const NewsList = ({ blogs, loading, onCategorySelect }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-2 text-muted">Đang tải bài viết...</p>
      </div>
    );
  }

  return (
    <div>
      {/* ALERT */}
      <div className="alert alert-danger d-flex align-items-center shadow-sm">
        <i className="fas fa-exclamation-triangle fa-2x me-3"></i>
        <div>
          <h5 className="alert-heading fw-bold mb-1">CẢNH BÁO KHẨN CẤP</h5>
          <p className="mb-0 small">Vui lòng theo dõi các thông báo mới nhất.</p>
        </div>
      </div>

      {/* FILTER BUTTONS - Dùng hàm từ cha truyền xuống */}
      <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
        <button className="btn btn-dark btn-sm rounded-pill px-3" onClick={() => onCategorySelect(null)}>
          Tất cả
        </button>
        <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => onCategorySelect(1)}>
          Cấp cứu – An toàn
        </button>
        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => onCategorySelect(2)}>
          Kỹ năng sinh tồn
        </button>
        <button className="btn btn-outline-info btn-sm rounded-pill px-3" onClick={() => onCategorySelect(3)}>
          Kiến thức cộng đồng
        </button>
        <button className="btn btn-outline-success btn-sm rounded-pill px-3" onClick={() => onCategorySelect(4)}>
          Tin tức cứu hộ
        </button>
      </div>

      {/* LIST BLOGS */}
      <div className="d-flex flex-column gap-4">
        {blogs && blogs.length > 0 ? (
          blogs.map(blog => <NewsCard key={blog.id} blog={blog} />)
        ) : (
          <div className="text-center py-5 bg-light rounded-3">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <p className="text-muted">Không tìm thấy bài viết nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;