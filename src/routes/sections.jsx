import Cookies from 'js-cookie';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AuthLayout from 'src/layouts/authLayout';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signUp'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetailPage = lazy(() => import('src/pages/productDetail'));
export const Page404 = lazy(() => import('src/pages/pageNotFound'));
export const HomeMainPage = lazy(() => import('src/pages/homeMain'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgotPassword'));
export const ResetPasswordPage = lazy(() => import('src/pages/resetPassword'));
export const HomePage = lazy(() => import('src/pages/homePage'));
export const ContentProductPage = lazy(() => import('src/pages/contentProduct'));
export const AddProductPage = lazy(() => import('src/pages/addProduct'));
export const ContentProductDetailPage = lazy(() => import('src/pages/contentProductDetail'));
export const ListProductPage = lazy(() => import('src/pages/listProduct'));

export default function Router() {
  const isAuthenticated = Cookies.get('accessToken');

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        <Navigate to="/homemain/contentProductPage" replace />
      ) : (
        <Navigate to="/homemain" replace />
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
        <Navigate to="/homemain" replace />
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
        <Navigate to="/homemain/contentProductPage" replace />
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'signup', element: <SignUpPage /> },
        { path: 'forgotPassword', element: <ForgotPasswordPage /> },
        { path: 'resetPassword', element: <ResetPasswordPage /> },
      ],
    },

    {
      path: 'homemain',
      element: (
        <HomeMainPage>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </HomeMainPage>
      ),
      children: [
        { element: <Navigate to="contentProductPage" replace />, index: true },
        { path: 'contentProductPage', element: <ContentProductPage /> },
        { path: 'contentProductDetail', element: <ContentProductDetailPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'listProduct', element: <ListProductPage /> },
      ],
    },
    {
      path: 'homePage',
      element: <HomePage />,
    },
    {
      path: 'addProduct',
      element: <AddProductPage />,
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
