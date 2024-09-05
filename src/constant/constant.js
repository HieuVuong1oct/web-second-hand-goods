export const listPath = {
  HOME_PAGE: '/homeMain',
  LOGIN: '/login',
  SIGN_UP: '/signUp',
  ADMIN: '/',
  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: '/resetPassword',
  ADD_PRODUCT: '/homeMain/addProduct',
  PRODUCT_DETAIL: '/product-detail',
  CONTENT_PRODUCT_DETAIL: '/homeMain/contentProductDetail',
  LIST_PRODUCT_BY_ID: (productId) => `/homeMain/product/get-by-id/${productId}`,
  PRODUCT_BY_CATEGORY_ID: (categoryId) => `/homeMain/categories/${categoryId}/products`,
  HISTORY: '/homeMain/history',
  ORDER: '/order',
  PRODUCT_DETAIL_ORDER: (productId) => `/order/product/get-by-id/${productId}`,
  ADMIN_SIGN_UP: '/admin/addUser',
  USER: '/user',
  EDIT_USER: (userId) => `/admin/editUser/${userId}`,
  ADMIN_DETAIL_PRODUCT: (productId) => `/admin/product/get-by-id/${productId}`,
  PRODUCT: '/products',
  EDIT_INFORMATION: (userId) => `/homeMain/editInformation/${userId}`,
  ADD_PRODUCT_ADMIN: '/admin/addProduct',
  EDIT_PRODUCT: (productId) => `/admin/editProduct/${productId}`,
  EDIT_PRODUCT_USER: (productId) => `/homeMain/editProduct/${productId}`,
};

export const listPathApi = {
  URL_LOGIN: '/auth/login',
  URL_SIGN_UP: '/auth/signup',
  URL_VERIFY_EMAIL: (email) => `/auth/verify/${email}`,
  URL_REFRESH_TOKEN: '/auth/refresh',
  URL_ADD_PRODUCT: '/product/add-product',
  URL_GET_ALL_PRODUCT: '/product/get-all',
  URL_GET_PRODUCT_BY_ID: (id) => `/product/get-by-id/${id}`,
  URL_GET_ALL_CATEGORY: '/category/get-all',
  URL_GET_ALL_USER: '/user/get-all',
  URL_ADD_CATEGORY: '/category/add-category',
  URL_SEND_OTP: '/auth/forgot-password',
  URL_NEW_PASSWORD: '/auth/set-password',
  URL_LOGOUT: '/auth/logout',
  URL_GET_PRODUCT_BY_CATEGORY_ID: '/product/list-product',
  URL_GET_CATEGORY_BY_ID: (categoryId) => `/category/get-by-id/${categoryId}`,
  URL_APPROVE_PRODUCT: (id) => `/product/approve/${id}`,
  URL_REJECT_PRODUCT: (id) => `/product/reject/${id}`,
  URL_PERSONAL_PRODUCT: `/user/personal-product`,
  URL_USER_BUY: (productId) => `user/request-to-buy/${productId}`,
  URL_APPROVE_REQUEST: (productId, userId) => `user/approve-request/${productId}/${userId}`,
  URL_REJECT_REQUEST: (productId, userId) => `user/reject-request/${productId}/${userId}`,
  URL_ADD_COMMENT: (productId) => `/comment/add-comment/${productId}`,
  URL_ADD_USER: '/user/add-user',
  URL_UPDATE_USER: (userId) => `user/update/${userId}`,
  URL_DELETE_USER: (userId) => `user/delete/${userId}`,
  URL_GET_USER_BY_ID: (userId) => `user/get-by-id/${userId}`,
  URL_TOP_PRODUCT: '/user/add-chart-for-trending',
  URL_TREND_PRODUCT: '/product/get-trending-products',
  URL_ADMIN_ADD_PRODUCT: '/product/add-product',
  URL_UPDATE_PRODUCT: (productId) => `product/update/${productId}`,
  URL_DELETE_PRODUCT: (productId) => `product/delete/${productId}`,
  URL_GET_LIST_PRODUCT: '/product/list-product',
  URL_ALL_NOTIFICATION: '/notification/get-all-noti',
  URL_NOTIFICATION: (notificationId) => `/notification/get-by-id/${notificationId}`,
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
  ERROR_SEARCH_USER: 'Không có người dùng nào',
  ERROR_TOP_PRODUCT: 'Lỗi xảy ra khi tải dữ liệu',
  SUCCESS_DELETE_PRODUCT: 'Xóa sản phẩm thành công!',
  ERROR_DELETE_PRODUCT: 'Xóa sản phẩm thất bại!',
  ERROR_SEARCH_PRODUCT: 'Không có sản phẩm nào',
  SUCCESS_UPDATE_PRODUCT: 'Cập nhật sản phẩm thành công!',
  ERROR_UPDATE_PRODUCT: 'Cập nhật thất bại!',
};

export const listStatus = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  SOLD: 'SOLD',
};
