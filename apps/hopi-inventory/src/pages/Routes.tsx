import { userState } from '@/atoms/user.atom'
import HomePage from '@/pages/home/HomePage'
import RootLayout from '@/pages/layout/RootLayout'
import LoginPage from '@/pages/login/LoginPage'
import SignupPage from '@/pages/signup/SignupPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import PrivateRoute from './PrivateRoute'
import { privateLoader, publicLoader } from './loaders'

const Routes = () => {
  const user = useRecoilValue(userState)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/signup',
          element: <SignupPage />,
          loader: publicLoader(user)
        },
        {
          path: '/login',
          element: <LoginPage />,
          loader: publicLoader(user)
        },
        {
          path: '/',
          element: <HomePage />,
          loader: privateLoader(user)
        },
        {
          path: '/user',
          element: <div>user</div>,
          loader: privateLoader(user)
        }
      ],
      errorElement: <div>routing error</div>
    }
  ])
  return <RouterProvider router={router} />
}

export default Routes