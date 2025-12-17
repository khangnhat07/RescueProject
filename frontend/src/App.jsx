import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Home/NavBar.jsx';
import Footer from './components/Home/Footer.jsx';
import LoginModal from './components/Home/LoginModal.jsx';
import HomePage from './page/HomePage.jsx';
import RegisterModal from './components/Home/RegisterModal.jsx';
// import NewsPage from './pages/NewsPage.jsx';
// import ContactPage from './pages/ContactPage.jsx';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LoginModal />
      <RegisterModal />

      {/* 2. Khu vực nội dung thay đổi theo URL */}
      <div style={{ minHeight: '80vh' }}> {/* Giữ chân trang luôn ở dưới */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/news" element={<NewsPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </div>

      {/* 3. Chân trang cố định */}
      <Footer />
    </BrowserRouter>
  );
}

export default App
