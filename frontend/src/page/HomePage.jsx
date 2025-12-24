import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import LiveFeed from '../components/Home/LiveFeed';
import StickySOS from '../components/Home/StickySOS';
import '../components/Home/custom.css';

const HomePage = () => {
  return (
    <>
      {/* Các phần chỉ xuất hiện ở Trang Chủ */}
      <HeroSection />
      <LiveFeed />
      <StickySOS />
    </>
  );
};

export default HomePage;