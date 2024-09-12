import Cookies from 'js-cookie';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import AuthLayout from 'src/layouts/admin/authLayout';
import DashboardLayout from 'src/layouts/admin/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signUp'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgotPassword'));
export const ResetPasswordPage = lazy(() => import('src/pages/resetPassword'));
export const AddUserPage = lazy(() => import('src/pages/addUser'));
export const EditUserPage = lazy(() => import('src/pages/editUser'));
export const EditUserViewPage = lazy(() => import('src/pages/editInformation'));

export const HomeMainPage = lazy(() => import('src/pages/homeMain'));
export const HomePage = lazy(() => import('src/pages/homePage'));

export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetailPage = lazy(() => import('src/pages/productDetail'));
export const AddProductPage = lazy(() => import('src/pages/addProduct'));
export const ViewAllProductPage = lazy(() => import('src/pages/viewAllProduct'));
export const ProductDetailAdminPage = lazy(() => import('src/pages/productDetailAdmin'));
export const EditProductViewPage = lazy(() => import('src/pages/editProduct'));

export const OrderPage = lazy(() => import('src/pages/order'));
export const HistoryPage = lazy(() => import('src/pages/history'));
export const ProductDetailOrderPage = lazy(() => import('src/pages/productDetailOrders'));

export const ContentPage = lazy(() => import('src/pages/content'));

export const Page404 = lazy(() => import('src/pages/pageNotFound'));

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);
export default function Router() {
  const isAuthenticated = Cookies.get('accessToken');
  const userRole = Cookies.get('role');
  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        <Navigate to="/homeMain/contentProduct" replace />
      ) : (
        <Navigate to="/homeMain" replace />
      ),
    },
    {
      path: '/',
      element:
        isAuthenticated && userRole === 'ADMIN' ? (
          <DashboardLayout>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ) : (
          <Navigate to="/homeMain" replace />
        ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'order/product/get-by-id/:productId', element: <ProductDetailOrderPage /> },
        { path: 'admin/addUser', element: <AddUserPage /> },
        { path: 'admin/editUser/:userId', element: <EditUserPage /> },
        { path: 'admin/product/get-by-id/:productId', element: <ProductDetailAdminPage /> },
        { path: 'admin/addProduct', element: <AddProductPage /> },
      ],
    },
    {
      path: '/',
      element: !isAuthenticated ? (
        <AuthLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </AuthLayout>
      ) : (
        <Navigate to="/homeMain" replace />
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'signUp', element: <SignUpPage /> },
        { path: 'forgotPassword', element: <ForgotPasswordPage /> },
        { path: 'resetPassword', element: <ResetPasswordPage /> },
      ],
    },
    {
      path: 'homeMain',
      element: (
        <HomeMainPage>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </HomeMainPage>
      ),
      children: [
        { element: <ContentPage />, index: true },
        { path: 'product/get-by-id/:productId', element: <ProductDetailPage /> },
        { path: 'categories/:categoryId/products', element: <ViewAllProductPage /> },
        { path: 'addProduct', element: <AddProductPage /> },
        { path: 'history', element: <HistoryPage /> },
        { path: 'editInformation/:userId', element: <EditUserViewPage /> },
        { path: 'editProduct/:productId', element: <EditProductViewPage /> },
      ],
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
