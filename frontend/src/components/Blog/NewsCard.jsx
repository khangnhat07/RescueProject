import React from "react";
import "../../assets/css/Blog.css";
import { useNavigate } from "react-router-dom";

const badgeColorMap = {
  "Cấp cứu – An toàn": "danger",
  "Kỹ năng sinh tồn": "primary",
  "Tin tức cứu hộ": "success",
  "Kiến thức cộng đồng": "info"
};

const NewsCard = ({ blog }) => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5454"; 

  if (!blog) return null;

  const badge = blog.category?.categoryName || "KHÁC";
  const badgeColor = badgeColorMap[badge] || "secondary";

  const imageUrl = blog.image || null;

  // Bạn có thể bỏ preview này vì CSS đã xử lý cắt chữ bằng -webkit-line-clamp
  const preview = blog.content;

  const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eeeeee%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23aaa%22%20dy%3D%22.3em%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";

  return (
    <div className="card news-card shadow-sm mb-4">
      {/* THÊM h-100 VÀO ĐÂY */}
      <div className="row g-0 h-100"> 
        <div className="col-md-4 h-100">
  <div className="news-image-wrapper">
    <img
      src={imageUrl || fallbackSvg}
      className="news-image rounded-start"
      alt={blog.title}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallbackSvg;
      }}
    />
  </div>
</div>

        <div className="col-md-8">
          {/* THÊM h-100 d-flex flex-column justify-content-between VÀO ĐÂY */}
          <div className="card-body h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="mb-2">
                <span className={`badge bg-${badgeColor}`}>{badge}</span>
                <small className="text-muted ms-2">
                  <i className="far fa-clock me-1"></i>
                  {new Date(blog.time).toLocaleDateString("vi-VN")}
                </small>
              </div>

              <h5 className="card-title fw-bold">{blog.title}</h5>
              <p className="card-text text-secondary small">{preview}</p>
            </div>
            
            <div className="text-end">
              <button
                className="btn btn-sm btn-dark fw-bold"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;