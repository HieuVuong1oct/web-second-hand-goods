import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Grid,
  Button,
  Divider,
  TextField,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { getProductById } from 'src/api/product';

const CommentSection = ({ productId, newComment, setNewComment, handleAddComment }) => {
  const [comments, setComments] = useState([]);

  const listComment = useCallback(async () => {
    try {
      const response = await getProductById(productId);
      const comment = response.data[0].comments;
      setComments(comment || []);
    } catch {
      alert('Lỗi khi load bình luận');
    }
  }, [productId]);

  useEffect(() => {
    listComment();
  }, [listComment]);

  const handleAddCommentAndReload = async () => {
    await handleAddComment();

    await listComment();
  };

  return (
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCommentAndReload}
        sx={{ mt: 2 }}
      >
        Thêm bình luận
      </Button>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Xem các bình luận</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {comments.map((comment, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography sx={{ color: 'blue' }} variant="body1">
                    {comment.user.username}
                  </Typography>
                  <Typography variant="body1">{comment.content || 'Không có bình luận'}</Typography>
                </Grid>
                {index < comments.length - 1 && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

CommentSection.propTypes = {
  productId: PropTypes.string.isRequired,
  newComment: PropTypes.string.isRequired,
  setNewComment: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentSection;
