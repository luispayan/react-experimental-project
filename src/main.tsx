import React from 'react';
import ReactDOM from 'react-dom/client';
import Products from './pages/Products.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Products
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "register",
    Component: Register
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
