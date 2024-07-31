

export const listPath ={
    homePage:"/homemain",
    login:"/login",
    signUp:"/signup",
    admin:"/",
    forgotPassword:"/forgotPassword",
    resetPassword:"/resetPassword",
    addProduct:"/addProduct",
    productDetail:'/product-detail',
    contentProductDetail:'/homemain/contentProductDetail',
    listProduct:'/homemain/listProduct',
    urlLogin:'/auth/login',
    urlSignUp:'/auth/signup',
    urlVerifyEmail:(email) => `/auth/verify/${email}`,
    urlRefreshToken:'/auth/refresh-token',
    urlAddProduct:'/product/add-product',
    urlGetAllProduct:'/product/get-all',
    urlGetProductById:(id) => `/product/get-by-id/${id}`,
    urlGetAllCategory:'/category/get-all',
    urlGetAllUser:'/user/get-all',
    
}

export const MESSAGES = {
    SUCCESS_ADD_PRODUCT: 'Thêm sản phẩm thành công!',
    ERROR_ADD_PRODUCT: 'Lỗi khi thêm sản phẩm!',
    SEND_EMAIL:'Đã gửi email đặt lại mật khẩu, vui lòng kiểm tra email của bạn.',
    ERROR_SEND_EMAIL:'Đã xảy ra lỗi trong quá trình gửi email. Vui lòng thử lại sau.',
    ERROR_ACCESS:'Bạn không có quyền truy cập trang này.',
    ERROR_LOGIN_WRONG:'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.',
    ERROR_LOGIN:'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.',
    SUCCESS_NEW_PASSWORD:'Mật khẩu đã được đặt lại thành công.',
    ERROR_NEW_PASSWORD: 'Đã xảy ra lỗi trong quá trình đặt lại mật khẩu. Vui lòng thử lại sau.',
    ERROR_SIGN_UP_WRONG:'Đăng ký không thành công. Vui lòng thử lại.',
    ERROR_SIGN_UP:'Đã xảy ra lỗi trong quá trình đăng ký. Kiểm tra lại thông tin và thử lại sau.',
    ERROR_CHECKPASSWORD:'Mật khẩu và xác nhận mật khẩu không khớp.',
  };