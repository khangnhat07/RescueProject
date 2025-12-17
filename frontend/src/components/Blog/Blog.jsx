// src/pages/Blog.jsx

import React from "react";

import Navbar from '../Navbar/Navbar';
import Hero from "../Blog/Hero";
import NewsList from "../Blog/NewsList";
import Sidebar from "../Sidebar/Siderbar";
import Footer from "../Footer/Footer";

const Blog = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <NewsList />
          </div>

          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
