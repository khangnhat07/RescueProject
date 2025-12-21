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
  const navigate = useNavigate();   // 🔹 dùng navigate

  if (!blog) return null;

  const badge = blog.category?.categoryName || "KHÁC";
  const badgeColor = badgeColorMap[badge] || "secondary";

  const preview =
    blog.content.length > 120
      ? blog.content.slice(0, 120) + "..."
      : blog.content;

  return (
    <div className="card news-card shadow-sm">
      <div className="row g-0">

        <div className="col-md-4">
          <img
            src="https://images.unsplash.com/photo-1544367563-12123d8965cd"
            className="img-fluid rounded-start h-100 object-fit-cover"
            alt={blog.title}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">

            <div className="mb-2">
              <span className={`badge bg-${badgeColor}`}>
                {badge}
              </span>
              <small className="text-muted ms-2">
                <i className="far fa-clock me-1"></i>
                {blog.time}
              </small>
            </div>

            <h5 className="card-title fw-bold">
              {blog.title}
            </h5>

            <p className="card-text text-secondary small">
              {preview}
            </p>
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
  );
};

export default NewsCard;
