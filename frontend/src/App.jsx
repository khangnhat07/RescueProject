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
import { AuthProvider } from './context/AuthContext'; 
import ChatPage from "./components/chat/ChatPage.jsx";

function App() {
  return (
    // --- BƯỚC 2: BAO BỌC ỨNG DỤNG BẰNG AUTHPROVIDER ---
    // Việc này giúp tất cả component con (Navbar, LoginModal,...) đều dùng được data user
    <AuthProvider> 
      <BrowserRouter>
        <Navbar />
        <LoginModal />
        <RegisterModal />

        {/* Khu vực nội dung thay đổi theo URL */}
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            {/* <Route path="/news" element={<NewsPage />} /> */}
            {/* <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </div>

        {/* Chân trang cố định */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
