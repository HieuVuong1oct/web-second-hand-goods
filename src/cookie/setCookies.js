import Cookies from 'js-cookie';

const setCookies = (userData) => {
  
  const cookies = {
    accessToken: userData.accessToken,
    refreshToken: userData.refreshToken,
    userId: userData.user.userId,
    username: userData.user.username,
    avatar: userData.user.avatar,
    email: userData.user.email,
    role:userData.user.role,
  };

  Object.entries(cookies).forEach(([key, value]) => {
    Cookies.set(key, value, { expires: 7 });
  });
  
};

const clearCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('userId');
  Cookies.remove('username');
  Cookies.remove('avatar');
  Cookies.remove('email');
  Cookies.remove('role');

};
export { setCookies,clearCookies };
