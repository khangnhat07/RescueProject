import axios from "axios";

const BASE_URL = "http://localhost:5454/blogs/blogAdmin";

// GET ALL BLOGS
export const getAllBlogs = () => {
  return axios.get(BASE_URL);
};

// CREATE BLOG
// blogData là một object: { title: "...", content: "...", image: "http://res.cloudinary...", categoryId: 1 }
export const createBlog = (blogData) => {
  return axios.post(BASE_URL, blogData); // Axios tự hiểu là JSON
};

// PUBLISH / UNPUBLISH
export const publishBlog = (id, published) => {
  return axios.post(`${BASE_URL}/${id}/publish`, null, {
    params: { published }
  });
};

// DELETE BLOG
export const deleteBlog = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// GET BLOG DETAIL (admin)
export const getBlogDetail = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

// UPDATE BLOG
// blogData gửi từ Component qua sẽ là object chứa URL ảnh từ Cloudinary
export const updateBlog = (id, blogData) => {
  return axios.put(`${BASE_URL}/${id}`, blogData); 
};