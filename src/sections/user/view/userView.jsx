import { useNavigate,useSearchParams, } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Add, Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Table,
  Paper,
  Alert,
  Button,
  Snackbar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  IconButton,
  TableContainer,
} from '@mui/material';

import { getUsers, deleteUser } from 'src/api/user';
import { listPath, MESSAGES } from 'src/constant/constant';

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const name = searchParams.get('name') || ''
  const role = searchParams.get('role') || ''
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [totalPages,setTotalPages] = useState(1)
  const itemsPerPage = 4
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const usersData = await getUsers(page,itemsPerPage,name,role);
      setUsers(usersData.data.usersWithImageUrls);
      setTotalPages(usersData.data.meta.total)
    } catch (err) {
      setError(MESSAGES.ERROR_GET_ALL_USER);
    }
  }, [page,itemsPerPage,name,role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => {
    navigate(listPath.adminSignUp);
  };

  const handleEditUser = (userId) => {
    navigate(listPath.editUser(userId));
  };
  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response) {
        setSnackbarMessage(MESSAGES.SUCCESS_DELETE_USER);
        setSnackbarSeverity('success');
        fetchUsers();
      } else {
        setSnackbarMessage(MESSAGES.ERROR_DELETE_USER);
        setSnackbarSeverity('error');
      }
    } catch (err) {
      setSnackbarMessage(MESSAGES.ERROR_DELETE_USER);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">Danh sách người dùng</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddUser}>
          Thêm mới user
        </Button>
      </Box>
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
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell align="left">{user.userId}</TableCell>
                  <TableCell align="left">
                    <img
                      src={JSON.parse(user.avatar)}
                      alt={user.username}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">
                    <IconButton color="primary" onClick={() => handleEditUser(user.userId)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteUser(user.userId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      )}
       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination
          count={Math.max(totalPages, 1)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserPage;
