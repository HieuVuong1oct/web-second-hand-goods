import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      backgroundColor: '#fff',
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
    },
    submitButton: {
      paddingY: theme.spacing(1),
      backgroundColor: '#1976d2',
      '&:hover': {
        backgroundColor: '#115293',
      },
    },
  }));

  export default useStyles;
  