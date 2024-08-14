import React from 'react';
import PropTypes from 'prop-types';

import ExpandMore from '@mui/icons-material';
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
}) => (
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
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAcceptRequest(request.userId, request.user.username)}
                      sx={{ mr: 1 }}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRejectRequest(request.userId, request.user.username)}
                    >
                      Từ chối
                    </Button>
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

UserRequestList.propTypes = {
  userBuy: PropTypes.array.isRequired,
  handleViewMessage: PropTypes.func.isRequired,
  handleAcceptRequest: PropTypes.func.isRequired,
  handleRejectRequest: PropTypes.func.isRequired,
};

export default UserRequestList;
