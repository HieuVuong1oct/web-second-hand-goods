import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, NotificationsOff, NotificationsActive } from '@mui/icons-material';

const ActionButtons = ({
  likes,
  dislikes,
  notificationsEnabled,
  handleLike,
  handleDislike,
  handleToggleNotifications,
}) => (
  <Grid container spacing={2} sx={{ mt: 2 }}>
    <Grid item>
      <IconButton aria-label="like" onClick={handleLike}>
        <ThumbUp />
      </IconButton>
      {likes}
      <IconButton aria-label="unlike" onClick={handleDislike}>
        <ThumbDown />
      </IconButton>
      {dislikes}
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        color={notificationsEnabled ? 'secondary' : 'primary'}
        onClick={handleToggleNotifications}
      >
        {notificationsEnabled ? <NotificationsOff /> : <NotificationsActive />}
        {notificationsEnabled ? 'Tắt thông báo' : 'Bật thông báo'}
      </Button>
    </Grid>
  </Grid>
);

ActionButtons.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  notificationsEnabled: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDislike: PropTypes.func.isRequired,
  handleToggleNotifications: PropTypes.func.isRequired,
};

export default ActionButtons;
