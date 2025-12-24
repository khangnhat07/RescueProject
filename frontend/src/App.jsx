import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// CSS/JS Bootstrap & App
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Components cho Layout
import Navbar from "./components/Home/NavBar.jsx";
import Footer from "./components/Home/Footer.jsx";
import LoginModal from "./components/Home/LoginModal.jsx";
import RegisterModal from "./components/Home/RegisterModal.jsx";

// Components cho Pages
import HomePage from "./page/HomePage.jsx";
import RescueRequestPage from "./components/rescueRequest/RescueRequestPage.jsx";
import UserRequestDetail from "./components/rescueRequest/UserRequestDetail.jsx";
import ManageRequestPage from "./components/manageRescueRequest/ManageRequestPage.jsx";
import ManageRequestDetail from "./components/manageRescueRequest/ManageRequestDetail.jsx";
import AdminRescueRequestPage from "./components/admin/AdminRescueRequestPage.jsx";
import AdminRequestDetail from "./components/admin/AdminRequestDetail.jsx";
import ChatPage from "./components/chat/ChatPage.jsx";
import Blog from "./components/Blog/Blog.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import BlogManagement from "./components/Admin/pages/BLogManagement.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import UserDetail from "./components/User/UserDetail.jsx";
// --- BƯỚC 1: TẠO COMPONENT LAYOUT CHUNG ---
const Layout = () => {
  return (
    <>
      <Navbar />
      <LoginModal />
      <RegisterModal />

      {/* Khu vực nội dung thay đổi theo URL - Outlet sẽ render các con của Route "/" */}
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

// --- BƯỚC 2: CẤU HÌNH ROUTER ---
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Dùng Layout làm cha bao bọc tất cả các trang
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/user/rescue",
          element: <RescueRequestPage />,
        },
        {
          path: "/user/detail-request/:id",
          element: <UserRequestDetail />,
        },
        {
          path: "/rescuer/rescue",
          element: <ManageRequestPage />,
        },
        {
          path: "/rescuer/detail-request/:id",
          element: <ManageRequestDetail />,
        },
        {
          path: "/admin/detail-request/:id",
          element: <AdminRequestDetail />,
        },
        {
          path: "/chat/:roomId",
          element: <ChatPage />,
        },
        {
          path: "/blogs",
          element: <Blog />,
        },
        {
          path: "/userDetail",
          element: <UserDetail />,
        },
      ],
    },
    {
      // NHÁNH CHO ADMIN (Dùng AdminLayout riêng, không bị dính Navbar của Layout trên)
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "blogs", // URL: /admin/blogs
          element: <BlogManagement />,
        },
        {
          path: "/admin/rescue",
          element: <AdminRescueRequestPage />,
        },
      ],
    },
    {
      path: "/blog/:id",
      element: <BlogDetail />,
    },

  ]);

  return (
    // --- BƯỚC 3: BAO BỌC BỞI AUTHPROVIDER ---
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
