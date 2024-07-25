import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    marginBottom: theme.spacing(4),
    backgroundColor:'#fce4ec'
  },
  logo: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
    marginLeft:'40px',
    marginRight:'20px',
    color: '#9c27b0'
  },
}));

export default useStyles;
