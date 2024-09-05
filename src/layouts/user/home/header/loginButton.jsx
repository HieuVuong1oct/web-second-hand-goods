import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const LoginButtons = ({ handleLoginClick, handleRegisterClick, classes }) => (
  <div className={classes.loginButtons}>
    <Button className={classes.loginButton} onClick={handleLoginClick}>
      Đăng nhập
    </Button>
    <Button className={classes.loginButton} onClick={handleRegisterClick}>
      Đăng ký
    </Button>
  </div>
);
LoginButtons.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
  handleRegisterClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default LoginButtons;
