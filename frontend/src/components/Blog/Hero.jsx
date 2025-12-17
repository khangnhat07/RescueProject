// components/Hero.js
import React from 'react';
import '../../assets/css/Blog.css';

const Hero = () => (
  <div className="bg-dark text-white py-4 mb-4 border-bottom border-danger border-3">
    <div className="container">
      <h2 className="fw-bold mb-0"><i className="fas fa-newspaper me-2"></i>Cổng thông tin Cảnh báo & Trú ẩn</h2>
      <p className="text-secondary mb-0 small mt-1">Cập nhật 24/7 tình hình thiên tai và các điểm an toàn gần bạn.</p>
    </div>
  </div>
);

export default Hero;
