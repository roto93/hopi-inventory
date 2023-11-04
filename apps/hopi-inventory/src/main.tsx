import './styles/reset.css'
import './styles/global.scss'
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RootLayout from './pages/layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{
      path: '/',
      element: <HomePage />
    }, {
      path: '/login',
      element: <LoginPage />
    }]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
