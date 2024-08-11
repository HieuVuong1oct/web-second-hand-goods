import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    padding: theme.spacing(2, 4),
    backgroundColor: '#f5f5f5',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color:'rgb(50, 50, 50)'
  },
  socialIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default useStyles;