import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useCallback } from 'react';

import { ExpandMore } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  List,
  Grid,
  Button,
  Divider,
  ListItem,
  TextField,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { getUsers } from 'src/api/user';
import { getComment } from 'src/api/product';

const socket = io('http://localhost:3000');

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .trim('Bình luận không được bỏ trống')
    .required('Bạn chưa nhập bình luận')
    .min(1, 'Bình luận phải có ít nhất 1 ký tự'),
});
const CommentSection = ({ productId, handleAddComment }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleComments, setVisibleComments] = useState(4);
  const [expanded, setExpanded] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserTagList, setShowUserTagList] = useState(false);
  const [taggedUserIds, setTaggedUserIds] = useState([1]);

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
      const response = await getComment(productId);
      const comment = response.data;
      setComments(comment || []);
    } catch {
      alert('Lỗi khi load bình luận');
    }
  }, [productId]);

  const listUser = useCallback(async () => {
    try {
      const response = await getUsers('', '', '', '');
      const userName = response.data;

      setUsers(userName || []);
    } catch {
      alert('Lỗi khi load danh sách user');
    }
  }, []);

  useEffect(() => {
    listComment();
    listUser();
    socket.on(`comment ${productId}`, (data) => {
      setComments((prevComments) => [
        ...prevComments,
        {
          user: data.user,
          content: data.content,
        },
      ]);
    });

    return () => {
      socket.off(`comment ${productId}`);
    };
  }, [listComment, productId, listUser]);

  const handleAddCommentAndReload = async (data) => {
    setLoading(true);
    const trimmedComment = commentValue.trim();

    await handleAddComment(trimmedComment, taggedUserIds);

    reset();
    setShowUserTagList(false);
    setCommentValue('');
    setTaggedUserIds([]);

    await listComment();
    setLoading(false);
  };
  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 4);
  };

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  const handleCommentInputChange = (e) => {
    const { value } = e.target;
    setCommentValue(value);

    // Khi người dùng nhập "@", lọc danh sách người dùng
    if (value.includes('@')) {
      const tagInput = value.split('@').pop();
      if (tagInput.length > 0) {
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(tagInput.toLowerCase())
        );

        setFilteredUsers(filtered);
        setShowUserTagList(true);
      }
    } else {
      setShowUserTagList(false);
    }
  };

  const handleTagClick = (username, userId) => {
    const currentComment = commentValue.split('@');
    currentComment.pop();
    const newComment = `${currentComment.join('@')}@${username} `;

    setCommentValue(newComment);
    setTaggedUserIds((prev) => [...prev, userId]);
    setShowUserTagList(false);
  };

  const formatComment = (comment) => {
    const parts = [];
    let index = 0;

    while (index < comment.length) {
      const atIndex = comment.indexOf('@', index);
      if (atIndex === -1) {
        parts.push(comment.slice(index));
        break;
      }

      const spaceIndex = comment.indexOf(' ', atIndex + 1);
      const endIndex = spaceIndex === -1 ? comment.length : spaceIndex;
      const tag = comment.slice(atIndex + 1, endIndex);
      const isUser = users.some((user) => user.username === tag);

      if (isUser) {
        parts.push(comment.slice(index, atIndex));
        parts.push(
          <span key={parts.length} style={{ color: 'red' }}>
            {tag}
          </span>
        );
      } else {
        parts.push(comment.slice(index, endIndex));
      }

      index = endIndex;
    }

    return parts;
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
                handleCommentInputChange(e); // Sử dụng hàm handleCommentInputChange
                field.onChange(e);
              }}
            />
          )}
        />

        {/* Hiển thị danh sách người dùng khi tag "@" */}
        {showUserTagList && (
          <List
            sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: 1 }}
          >
            {filteredUsers.map((user) => (
              <ListItem
                key={user.userId}
                component="button"
                onClick={() => handleTagClick(user.username, user.userId)}
              >
                {user.username}
              </ListItem>
            ))}
          </List>
        )}

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
                  <Typography variant="body1">
                    {formatComment(comment.content) || 'Không có bình luận'}
                  </Typography>
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
