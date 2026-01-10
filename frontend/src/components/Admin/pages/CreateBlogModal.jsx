import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBlog, updateBlog } from "../../config/adminBlogApi";
import {uploadImageToCloudinary} from "../../../utils/cloudinaryUploads";
const CreateBlogModal = ({ onClose, onSuccess, initialData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialData;
  const BASE_URL = "http://localhost:5454"; // Khai báo base url để hiện ảnh cũ

  // 1. Lấy danh sách chuyên mục
  useEffect(() => {
    axios
      .get(`${BASE_URL}/blogs/categories`)
      .then((res) => setCategories(res.data.data))
      .catch(() => console.error("Không tải được chuyên mục"));
  }, []);

  // 2. Đổ dữ liệu cũ nếu là chế độ Sửa
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setCategoryId(initialData.category?.id || "");

      // FIX: Nếu có ảnh từ backend, nối thêm domain để hiển thị
      if (initialData.image) {
        setPreviewUrl(initialData.image);
      } else {
        setPreviewUrl("");
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategoryId("");
    setImageFile(null);
    setPreviewUrl("");
  };

  // 3. Xử lý chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Tạo link tạm để preview ảnh mới chọn
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !categoryId) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = initialData?.image || "";

      // 👉 nếu có chọn ảnh mới → upload Cloudinary
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const payload = {
        title,
        content,
        categoryId: Number(categoryId),
        image: imageUrl, // ✅ URL Cloudinary
      };

      if (isEdit) {
        await updateBlog(initialData.id, payload);
      } else {
        await createBlog(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(isEdit ? "Cập nhật thất bại" : "Tạo blog thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000080", zIndex: 1060 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-bottom-0 pt-4 px-4">
            <h5 className="modal-title fw-bold text-dark">
              {isEdit ? (
                <>
                  <i className="fas fa-edit me-2 text-primary"></i>Cập nhật bài
                  viết
                </>
              ) : (
                <>
                  <i className="fas fa-plus-circle me-2 text-danger"></i>Viết
                  bài blog mới
                </>
              )}
            </h5>
            <button
              className="btn-close shadow-none"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body px-4">
            <div className="row">
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Tiêu đề bài viết
                  </label>
                  <input
                    className="form-control rounded-3"
                    placeholder="Nhập tiêu đề..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Chuyên mục</label>
                  <select
                    className="form-select rounded-3"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">-- Chọn chuyên mục --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-5">
                <label className="form-label fw-semibold">Ảnh đại diện</label>
                <div
                  className="border rounded-3 d-flex flex-column align-items-center justify-content-center bg-light position-relative overflow-hidden"
                  style={{
                    height: "145px",
                    borderStyle: "dashed",
                    cursor: "pointer",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="text-center text-muted">
                      <i className="fas fa-image fa-2x mb-2"></i>
                      <p className="small mb-0">Chọn ảnh</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="position-absolute w-100 h-100 top-0 start-0 opacity-0"
                    style={{ cursor: "pointer" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label fw-semibold">
                Nội dung chi tiết
              </label>
              <textarea
                rows="6"
                className="form-control rounded-3"
                placeholder="Nội dung bài viết..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer border-top-0 pb-4 px-4">
            <button
              className="btn btn-light px-4 rounded-pill fw-semibold"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className={`btn ${
                isEdit ? "btn-primary" : "btn-danger"
              } px-4 rounded-pill shadow-sm fw-semibold`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : isEdit ? "Lưu thay đổi" : "Đăng bài"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;
