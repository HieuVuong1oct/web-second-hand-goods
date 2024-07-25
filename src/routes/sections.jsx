import Cookies from 'js-cookie';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AuthLayout from 'src/layouts/authLayout';
import DashboardLayout from 'src/layouts/dashboard';


export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetailPage = lazy(() => import('src/pages/ProductDetail'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HomeMainPage = lazy(() => import('src/pages/homemain'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgotPassword'));

export default function Router() {
  const isAuthenticated = Cookies.get('accessToken');

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        <Navigate to="/homemain" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: '/',
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
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
        { path: 'product-detail', element: <ProductDetailPage /> },
      ],
    },
    {
      path: '/',
      element: !isAuthenticated ? (
        <AuthLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </AuthLayout>
      ) : (
        <Navigate to="/homemain" replace />
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'signup', element: <SignUpPage /> },
        { path: 'forgotPassword', element: <ForgotPasswordPage /> },
      ],
    },
    {
      path: 'homemain',
      element: <HomeMainPage />,
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
