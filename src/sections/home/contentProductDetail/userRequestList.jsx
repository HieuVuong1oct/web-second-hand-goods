import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {ExpandMore} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Paper,
  Table,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Container,
  Accordion,
  Typography,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const UserRequestList = ({
  userBuy,
  handleViewMessage,
  handleAcceptRequest,
  handleRejectRequest,
}) => {
  const [loading, setLoading] = useState({
    accept: null,
    reject: null,
  });

  const handleAccept = async (userId, username) => {
    setLoading((prev) => ({ ...prev, accept: userId }));
    await handleAcceptRequest(userId, username);
    setLoading((prev) => ({ ...prev, accept: null }));
  };

  const handleReject = async (userId, username) => {
    setLoading((prev) => ({ ...prev, reject: userId }));
    await handleRejectRequest(userId, username);
    setLoading((prev) => ({ ...prev, reject: null }));
  };
  return(
  
  <Container sx={{ mt: 4 }}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" gutterBottom>
          Danh sách người đăng ký mua
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên tài khoản</TableCell>
                <TableCell>Giá mong muốn</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userBuy.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.user.username}</TableCell>
                  <TableCell>${request.offer}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewMessage(request.message)}
                      sx={{ mr: 1 }}
                    >
                      Xem lời nhắn
                    </Button>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(request.userId, request.user.username)}
                        loading={loading.accept === request.userId}
                        sx={{ mr: 1 }}
                      >
                        Đồng ý
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(request.userId, request.user.username)}
                        loading={loading.reject === request.userId}
                      >
                        Từ chối
                      </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  </Container>
);
}
UserRequestList.propTypes = {
  userBuy: PropTypes.array.isRequired,
  handleViewMessage: PropTypes.func.isRequired,
  handleAcceptRequest: PropTypes.func.isRequired,
  handleRejectRequest: PropTypes.func.isRequired,
};

export default UserRequestList;
