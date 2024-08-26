

export const listPath = {
  homePage: '/homeMain',
  login: '/login',
  signUp: '/signUp',
  admin: '/',
  forgotPassword: '/forgotPassword',
  resetPassword: '/resetPassword',
  addProduct: '/homeMain/addProduct',
  productDetail: '/product-detail',
  contentProductDetail: '/homeMain/contentProductDetail',
  listProductById: (productId) => `/homeMain/product/get-by-id/${productId}`,
  productByCategoryId: (categoryId) => `/homeMain/categories/${categoryId}/products`,
  history: '/homeMain/history',
  order: '/order',
  productDetailOrders: (productId) => `/order/product/get-by-id/${productId}`,
  adminSignUp: '/admin/addUser',
  user: '/user',
  editUser: (userId) => `/admin/editUser/${userId}`,
  adminDetailProduct:(productId) => `/admin/product/get-by-id/${productId}`,
  product:'/products',
  editInformation:(userId) => `/homeMain/editInformation/${userId}`,
  addProductAdmin:'/admin/addProduct',
  editProduct:(productId) => `/admin/editProduct/${productId}`,
};

export const listPathApi = {
  urlLogin: '/auth/login',
  urlSignUp: '/auth/signup',
  urlVerifyEmail: (email) => `/auth/verify/${email}`,
  urlRefreshToken: '/auth/refresh',
  urlAddProduct: '/product/add-product',
  urlGetAllProduct: '/product/get-all',
  urlGetProductById: (id) => `/product/get-by-id/${id}`,
  urlGetAllCategory: '/category/get-all',
  urlGetAllUser: '/user/get-all',
  urlAddCategory: '/category/add-category',
  urlSendOtp: '/auth/forgot-password',
  urlNewPassword: '/auth/set-password',
  urlLogout: '/auth/logout',
  urlGetProductByCategoryId: '/product/list-product',
  urlGetCategoryById: (categoryId) => `/category/get-by-id/${categoryId}`,
  urlApproveProduct: (id) => `/product/approve/${id}`,
  urlRejectProduct: (id) => `/product/reject/${id}`,
  urlPersonalProduct: `/user/personal-product`,
  urlUserBuy: (productId) => `user/request-to-buy/${productId}`,
  urlApproveRequest: (productId, userId) => `user/approve-request/${productId}/${userId}`,
  urlRejectRequest: (productId, userId) => `user/reject-request/${productId}/${userId}`,
  urlAddComment: (productId) => `/comment/add-comment/${productId}`,
  urlAddUser: '/user/add-user',
  urlUpdateUser: (userId) => `user/update/${userId}`,
  urlDeleteUser: (userId) => `user/delete/${userId}`,
  urlGetUserById: (userId) => `user/get-by-id/${userId}`,
  urlTopProduct:'/user/add-chart-for-trending',
  urlTrendProduct:'/product/get-trending-products',
  urlAdminAddProduct:'/product/add-product',
  urlUpdateProduct: (productId) => `product/update/${productId}`,
  urlDeleteProduct: (productId) => `product/delete/${productId}`,
  urlGetListProduct: '/product/list-product',
};

export const MESSAGES = {
  SUCCESS_ADD_PRODUCT: 'Đăng bán thành công! ',
  ERROR_ADD_PRODUCT: 'Đăng bán thất bại!',
  SEND_EMAIL: 'Đã gửi email đặt lại mật khẩu, vui lòng kiểm tra email của bạn.',
  ERROR_SEND_EMAIL: 'Đã xảy ra lỗi trong quá trình gửi email. Vui lòng thử lại sau.',
  ERROR_ACCESS: 'Bạn không có quyền truy cập trang này.',
  ERROR_LOGIN_WRONG: 'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.',
  ERROR_LOGIN: 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.',
  SUCCESS_NEW_PASSWORD: 'Mật khẩu đã được đặt lại thành công.',
  ERROR_NEW_PASSWORD: 'Đã xảy ra lỗi trong quá trình đặt lại mật khẩu. Vui lòng thử lại sau.',
  ERROR_SIGN_UP_WRONG: 'Đăng ký không thành công. Vui lòng thử lại.',
  ERROR_SIGN_UP: 'Đã xảy ra lỗi trong quá trình đăng ký. Kiểm tra lại thông tin và thử lại sau.',
  ERROR_CHECKPASSWORD: 'Mật khẩu và xác nhận mật khẩu không khớp.',
  OTP_SEND: 'Đã gửi OTP, kiểm tra email',
  ERROR_OTP_SEND: 'Lỗi khi gửi OTP',
  PASSWORD_RESET_SUCCESS: 'Tạo mật khẩu mới thành công',
  ERROR_RESET_PASSWORD: 'Lỗi khi tạo mật khẩu mới',
  SUCCESS_ADD_USER: 'Thêm người dùng thành công!',
  ERROR_ADD_USER: 'Thêm người dùng thất bại!',
  SUCCESS_UPDATE_USER: 'Cập nhật thông tin người dùng thành công!',
  ERROR_UPDATE_USER: 'Cập nhật thông tin người dùng thất bại!',
  SUCCESS_DELETE_USER: 'Xóa người dùng thành công!',
  ERROR_DELETE_USER: 'Xóa người dùng thất bại!',
  ERROR_GET_ALL_USER: 'Gặp lỗi khi lấy dữ liệu hoặc token không hợp lệ',
  ERROR_SEARCH_USER:'Không có người dùng nào',
  ERROR_TOP_PRODUCT:'Lỗi xảy ra khi tải dữ liệu',
  SUCCESS_DELETE_PRODUCT: 'Xóa sản phẩm thành công!',
  ERROR_DELETE_PRODUCT: 'Xóa sản phẩm thất bại!',
  ERROR_SEARCH_PRODUCT:'Không có sản phẩm nào',
};

export const listStatus = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  SOLD: 'SOLD',
};
