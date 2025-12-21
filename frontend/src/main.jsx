import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RescueRequestPage from './components/rescueRequest/RescueRequestPage.jsx';
import ManageRequestPage from './components/manageRescueRequest/ManageRequestPage.jsx';
import AdminRescueRequestPage from './components/admin/AdminRescueRequestPage.jsx';
import AdminRequestDetail from './components/admin/AdminRequestDetail.jsx';
import ManageRequestDetail from './components/manageRescueRequest/ManageRequestDetail.jsx';
import UserRequestDetail from './components/rescueRequest/UserRequestDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/rescue",
    element: <RescueRequestPage />
  },
  {
    path: "/user/detail-request/:id",
    element: <UserRequestDetail />
  }
  ,
  {
    path: "/rescuer/rescue",
    element: <ManageRequestPage />
  }
  ,
  ,
  {
    path: "/rescuer/detail-request/:id",
    element: <ManageRequestDetail />
  },
  {
    path: "/admin/rescue",
    element: <AdminRescueRequestPage />
  }
  ,
  {
    path: "/admin/detail-request/:id",
    element: <AdminRequestDetail />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)