import Cookies from 'js-cookie';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomeMainPage = lazy(() => import('src/pages/homemain'));

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = Cookies.get('accessToken'); // Kiểm tra token trong cookie
  console.log(isAuthenticated);
  const routes = useRoutes([
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: 'signup',
      element: isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />,
    },
    {
      path: 'homemain',
      element: !isAuthenticated ? <Navigate to="/homemain" replace /> : <HomeMainPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
