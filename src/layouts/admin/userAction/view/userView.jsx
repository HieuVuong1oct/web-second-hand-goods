import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Add, Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Table,
  Paper,
  Alert,
  Button,
  Dialog,
  Snackbar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { getUsers, deleteUser } from 'src/api/user';
import { listPath, MESSAGES } from 'src/constant/constant';

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const name = searchParams.get('name') || '';
  const role = searchParams.get('role') || '';

  const navigate = useNavigate();

  const itemsPerPage = 4;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await getUsers(page, itemsPerPage, name, role);
      setUsers(usersData.data.usersWithImageUrls);
      setTotalPages(usersData.data.meta.total);
      if (usersData.data.usersWithImageUrls.length === 0) {
        setError(MESSAGES.ERROR_SEARCH_USER);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(MESSAGES.ERROR_GET_ALL_USER);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, name, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => {
    navigate(listPath.ADMIN_SIGN_UP);
  };

  const handleEditUser = (userId) => {
    navigate(listPath.EDIT_USER(userId));
  };
  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDeleteUser = async () => {
    setDeleting(true);
    try {
      const response = await deleteUser(userToDelete);
      if (response) {
        setSearchParams({ page: 1 });
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
    setDialogOpen(false);
    setDeleting(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openDialog = (userId) => {
    setUserToDelete(userId);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setUserToDelete(null);
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

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">STT</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Tên người dùng</TableCell>
                <TableCell align="left">Tên tài khoản</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell align="left">{(page - 1) * itemsPerPage + index + 1}</TableCell>
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
                    <IconButton color="secondary" onClick={() => openDialog(user.userId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {users.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
            count={Math.max(totalPages, 1)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

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

      <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="confirm-delete-dialog">
        <DialogTitle id="confirm-delete-dialog">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa người dùng này không?</Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={closeDialog} color="primary" loading={deleting}>
            Hủy
          </LoadingButton>
          <LoadingButton onClick={handleDeleteUser} color="secondary" loading={deleting}>
            Xóa
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;
