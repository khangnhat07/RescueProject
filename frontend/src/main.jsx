import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// 1. Import Bootstrap CSS (for styling)
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import Bootstrap JS (THIS IS THE IMPORTANT PART)
// This line loads the JS and attaches "bootstrap" to the "window" object
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(

    <App />

)
