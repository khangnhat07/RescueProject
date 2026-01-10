import React, { useEffect, useState } from "react";
import {
  getAllBlogs,
  publishBlog,
  deleteBlog,
} from "../../config/adminBlogApi";
import CreateBlogModal from "./CreateBlogModal";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // Lưu blog đang được chọn để sửa
  const API_BASE_URL = "http://localhost:5454";

  // Lấy dữ liệu khi mount component
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      // Giả sử API trả về cấu trúc res.data.data
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    }
  };

  // Mở modal chế độ THÊM MỚI
  const handleAddNew = () => {
    setSelectedBlog(null);
    setShowModal(true);
  };

  // Mở modal chế độ CHỈNH SỬA
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  // Hàm đóng Modal và dọn dẹp state
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handlePublish = async (blog) => {
    try {
      await publishBlog(blog.id, !blog.published);
      fetchBlogs(); // Load lại danh sách sau khi cập nhật trạng thái
    } catch (err) {
      alert("Cập nhật trạng thái thất bại",err);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Bạn chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
      )
    ) {
      try {
        await deleteBlog(id);
        fetchBlogs();
      } catch (err) {
        alert("Xóa bài viết thất bại",err);
      }
    }
  };

  return (
    <div className="container-fluid py-2">
      {/* 1. Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded-3 shadow-sm">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Quản lý nội dung</h4>
          <p className="text-muted small mb-0">
            Hệ thống quản lý bài viết Blog & Tin tức
          </p>
        </div>
        <button
          className="btn btn-danger px-4 py-2 rounded-pill shadow-sm fw-bold"
          onClick={handleAddNew}
        >
          <i className="fas fa-feather-alt me-2"></i>Viết bài mới
        </button>
      </div>

      {/* 2. Table Section */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 custom-table">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="px-4 py-3 border-0">ID</th>
                  <th className="border-0">Nội dung bài viết</th>
                  <th className="border-0 text-center">Chuyên mục</th>
                  <th className="border-0">Thời gian</th>
                  <th className="border-0">Trạng thái</th>
                  <th className="border-0 text-end px-4">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-4 text-muted small">#{blog.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {/* Thay đoạn icon file-alt bằng ảnh này */}
                          <div
                            className="blog-icon me-3 bg-light rounded-3 overflow-hidden d-flex align-items-center justify-content-center"
                            style={{ width: "50px", height: "50px" }}
                          >
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt="thumb"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <i className="far fa-image text-muted"></i>
                            )}
                          </div>
                          <div
                            className="fw-bold text-dark text-truncate"
                            style={{ maxWidth: "300px" }}
                          >
                            {blog.title}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border-0 px-3 py-2 rounded-pill fw-normal">
                          {blog.category?.categoryName || "Chung"}
                        </span>
                      </td>
                      <td className="small text-muted">
                        <i className="far fa-calendar-alt me-1"></i>
                        {blog.time
                          ? new Date(blog.time).toLocaleDateString("vi-VN")
                          : "---"}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            blog.published ? "st-done" : "st-waiting"
                          }`}
                        >
                          <span className="dot me-1"></span>
                          {blog.published ? "Đã đăng" : "Bản nháp"}
                        </span>
                      </td>

                      <td className="text-end px-4">
                        <div className="d-flex justify-content-end gap-2">
                          {/* Nút Ẩn/Hiện */}
                          <button
                            className={`btn btn-icon ${
                              blog.published
                                ? "btn-soft-success"
                                : "btn-soft-secondary"
                            }`}
                            onClick={() => handlePublish(blog)}
                            title={blog.published ? "Gỡ bài" : "Đăng bài"}
                          >
                            <i
                              className={`fas ${
                                blog.published ? "fa-eye" : "fa-eye-slash"
                              }`}
                            ></i>
                          </button>

                          {/* Nút Sửa */}
                          <button
                            className="btn btn-icon btn-soft-primary"
                            onClick={() => handleEdit(blog)}
                            title="Sửa bài viết"
                          >
                            <i className="fas fa-edit text-primary"></i>
                          </button>

                          {/* Nút Xóa */}
                          <button
                            className="btn btn-icon btn-soft-danger"
                            onClick={() => handleDelete(blog.id)}
                            title="Xóa bài"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      Hiện chưa có bài viết nào được tạo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Modal Section */}
      {showModal && (
        <CreateBlogModal
          initialData={selectedBlog} // Truyền dữ liệu sang Modal (null nếu thêm mới)
          onClose={handleCloseModal}
          onSuccess={() => {
            fetchBlogs();
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default BlogManagement;
