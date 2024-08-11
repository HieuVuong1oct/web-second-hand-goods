
import React, { useState,useEffect,  } from 'react';

import { Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';

import { getUsers } from 'src/api/user';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        setError('Gặp lỗi khi lấy dữ liệu hoặc token không hợp lệ');
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Tên người dùng</TableCell>
                <TableCell align="left">Tên tài khoản</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Số sản phẩm đang bán</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell align="left">{user.userId}</TableCell>
                  <TableCell align="left">
                    <img src={user.avatar} alt={user.username} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{/* Số sản phẩm đang bán */}</TableCell>
                  <TableCell align="left">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    
                    <IconButton  color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton  color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserPage;
