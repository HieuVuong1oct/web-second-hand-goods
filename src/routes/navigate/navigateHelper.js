import { useNavigate } from 'react-router-dom';

import { listPath } from '../constant';


export const useNavigationHelpers = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(listPath.login);
  };

  const navigateToSignUp = () => {
    navigate(listPath.signUp);
  };
  
  const navigateToHome = () => {
    navigate(listPath.homePage);
  };

  const navigateToAdmin = () => {
    navigate(listPath.admin);
  };
  
  const navigateToForgotPassword = () => {
    navigate(listPath.forgotPassword);
  }


  return {
    navigateToLogin,
    navigateToSignUp,
    navigateToHome,
    navigateToAdmin,
    navigateToForgotPassword,
   
  };
};