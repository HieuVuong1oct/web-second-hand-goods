import React from 'react';
import PropTypes from 'prop-types';

import { Grid, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const ActionButtons = ({
  likes,
  dislikes,

  handleLike,
  handleDislike,
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
  </Grid>
);

ActionButtons.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,

  handleLike: PropTypes.func.isRequired,
  handleDislike: PropTypes.func.isRequired,
};

export default ActionButtons;
