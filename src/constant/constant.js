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
  listProductById:(productId) => `/homeMain/product/get-by-id/${productId}`,
  productByCategoryId:(categoryId) => `/homeMain/categories/${categoryId}/products`,
  history:'/homeMain/history'
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
  urlGetProductByCategoryId:'/product/list-product',
  urlGetCategoryById:(categoryId) => `category/get-by-id/${categoryId}`
};

export const MESSAGES = {
  SUCCESS_ADD_PRODUCT: 'Đăng bán thành công! Sản phẩm được gửi cho ADMIN duyệt! ',
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
};
