import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// CSS/JS Bootstrap & App
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components cho Layout
import Navbar from './components/Home/NavBar.jsx';
import Footer from './components/Home/Footer.jsx';
import LoginModal from './components/Home/LoginModal.jsx';
import RegisterModal from './components/Home/RegisterModal.jsx';

// Components cho Pages
import HomePage from './page/HomePage.jsx';
import RescueRequestPage from './components/rescueRequest/RescueRequestPage.jsx';
import UserRequestDetail from './components/rescueRequest/UserRequestDetail.jsx';
import ManageRequestPage from './components/manageRescueRequest/ManageRequestPage.jsx';
import ManageRequestDetail from './components/manageRescueRequest/ManageRequestDetail.jsx';
import AdminRescueRequestPage from './components/admin/AdminRescueRequestPage.jsx';
import AdminRequestDetail from './components/admin/AdminRequestDetail.jsx';
import ChatPage from "./components/chat/ChatPage.jsx";

// --- BƯỚC 1: TẠO COMPONENT LAYOUT CHUNG ---
const Layout = () => {
  return (
    <>
      <Navbar />
      <LoginModal />
      <RegisterModal />

      {/* Khu vực nội dung thay đổi theo URL - Outlet sẽ render các con của Route "/" */}
      <div style={{ minHeight: '80vh' }}>
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
          element: <HomePage />
        },
        {
          path: "/user/rescue",
          element: <RescueRequestPage />
        },
        {
          path: "/user/detail-request/:id",
          element: <UserRequestDetail />
        },
        {
          path: "/rescuer/rescue",
          element: <ManageRequestPage />
        },
        {
          path: "/rescuer/detail-request/:id",
          element: <ManageRequestDetail />
        },
        {
          path: "/admin/rescue",
          element: <AdminRescueRequestPage />
        },
        {
          path: "/admin/detail-request/:id",
          element: <AdminRequestDetail />
        },
        {
          path: "/chat",
          element: <ChatPage />
        },
      ],
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
