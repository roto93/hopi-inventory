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
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute user={{ email: '', username: '' }} />,
        children: [
          {
            path: '/',
            element: <HomePage />
          },
          {
            path: '/user',
            element: <div>user</div>
          }
        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      }],
    errorElement: <div>routing error</div>
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
