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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/rescue",
    element: <RescueRequestPage />
  }
  ,
  {
    path: "/manage/rescue",
    element: <ManageRequestPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)