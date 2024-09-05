import { useNavigate } from 'react-router-dom';

import { listPath } from '../../constant/constant';


export const useNavigationHelpers = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(listPath.LOGIN);
  };

  const navigateToSignUp = () => {
    navigate(listPath.SIGN_UP);
  };
  
  const navigateToHome = () => {
    navigate(listPath.HOME_PAGE);
  };

  const navigateToAdmin = () => {
    navigate(listPath.ADMIN);
  };
  
  const navigateToForgotPassword = () => {
    navigate(listPath.FORGOT_PASSWORD);
  }

  const navigateToResetPassword = () => {
    navigate(listPath.RESET_PASSWORD);
  }

  const navigateProductById = (id) => {
   
    navigate(listPath.LIST_PRODUCT_BY_ID(id))
  }

  
  return {
    navigateToLogin,
    navigateToSignUp,
    navigateToHome,
    navigateToAdmin,
    navigateToForgotPassword,
    navigateToResetPassword,
    navigateProductById,
  };
};