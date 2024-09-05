import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    position: '',

    borderBottom: '1px solid hsla(0, 0%, 100%, .15)',
  },

  container: {
    width: '70%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  },

  loginButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'transparent',
    border: '1px solid #9c27b0',
    marginLeft: '8px',
  },

  logo: {
    display: 'flex',
    alignItems: 'start',

    color: '#9c27b0',
  },
}));

export default useStyles;
