// ----------------------------------------------------------------------
import Cookies from 'js-cookie';




export const account = {
  displayName: Cookies.get('username'),
  email:  Cookies.get('email'),
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
