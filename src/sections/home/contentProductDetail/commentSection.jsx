import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, TextField, Container, Typography } from '@mui/material';

const CommentSection = ({ newComment, setNewComment, handleAddComment, comments }) => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>
      Phản hồi
    </Typography>
    <TextField
      label="Nhập bình luận"
      type="text"
      fullWidth
      multiline
      rows={3}
      variant="outlined"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 2 }}>
      Thêm bình luận
    </Button>
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {comments.map((comment, index) => (
        <Grid item xs={12} key={index}>
          <Typography variant="body1">{comment}</Typography>
        </Grid>
      ))}
    </Grid>
  </Container>
);

CommentSection.propTypes = {
  newComment: PropTypes.string.isRequired,
  setNewComment: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentSection;
