import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useCallback } from 'react';

import { ExpandMore } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
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


const validationSchema = Yup.object().shape({
  comment: Yup.string()
  .trim('Bình luận không được bỏ trống')
    .required('Bạn chưa nhập bình luận')
    .min(1, 'Bình luận phải có ít nhất 1 ký tự'),
});
const CommentSection = ({ productId,  handleAddComment }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleComments, setVisibleComments] = useState(4);
  const [expanded, setExpanded] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const handleAddCommentAndReload = async (data) => {
    setLoading(true)
    const trimmedComment = data.comment.trim();
 
    await handleAddComment(trimmedComment);
    reset();
    setCommentValue('');
    await listComment();
    setLoading(false);
   
  };

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 4); 
  };
  const handleAccordionChange = () => {
    setExpanded((prev) => !prev); 
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Phản hồi
      </Typography>
      
      <form onSubmit={handleSubmit(handleAddCommentAndReload)}>
        <Controller
          name="comment"
          control={control}
         
          render={({ field }) => (
            <TextField
              {...field}
              label="Nhập bình luận"
              type="text"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={commentValue}
              error={!!errors.comment}
              helperText={errors.comment?.message}
              onChange={(e) => {
                field.onChange(e);
                setCommentValue(e.target.value);
              }}
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          loading={loading}
        >
          Thêm bình luận
        </LoadingButton>
      </form>
      <Accordion sx={{ mt: 2 }} expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Xem các bình luận</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {comments.slice(0, visibleComments).map((comment, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography sx={{ color: 'blue' }} variant="body1">
                    {comment.user.username}
                  </Typography>
                  <Typography variant="body1">{comment.content || 'Không có bình luận'}</Typography>
                </Grid>
                {index < visibleComments - 1 && index < comments.length - 1 && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                )}
              </React.Fragment>
            ))}
            {visibleComments < comments.length && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button onClick={handleShowMoreComments} variant="text">
                  Xem thêm
                </Button>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};


CommentSection.propTypes = {
  productId: PropTypes.string.isRequired,
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentSection;
