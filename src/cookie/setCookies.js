import Cookies from 'js-cookie';

const setCookies = (userData) => {
  const cookies = {
    accessToken: userData[1].accessToken,
    refreshToken: userData[2].refreshToken,
    userId: userData[0].userId,
    username: userData[0].username,
    avatar: userData[0].avatar,
    email: userData[0].email,
    role: userData[0].role,
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
