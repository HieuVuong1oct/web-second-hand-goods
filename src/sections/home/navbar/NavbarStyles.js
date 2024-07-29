import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    marginBottom: theme.spacing(4),
 
  },
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  
  button: {
    margin: theme.spacing(1),
    marginLeft:'40px',
    marginRight:'20px',
    borderLeft:'1px'
    
  },
  separator: {
    margin: `0 ${theme.spacing(1)}`, 
    color: '#9c27b0',
  },
}));

export default useStyles;
