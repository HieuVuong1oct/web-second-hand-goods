import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    // backgroundImage: 'url(/favicon/bg3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:' rgba(240, 240, 240, 0)',
   
    width: '100%',
    position:'',
    height:'90px',
    borderBottom:'1px solid hsla(0, 0%, 100%, .15)',
  
  },


  container: {
    width: '60%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  item1: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  item2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  loginButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    color: '#9c27b0', 
    backgroundColor: 'transparent', 
    border: '1px solid #9c27b0', 
    marginLeft: '8px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    margin: '0 16px',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  searchInput: {
    width: '100%', 
    maxWidth: '600px', 
    paddingLeft: '40px', 
    border: '1px solid #9c27b0', 
    borderRadius: '4px', 
    padding: '8px',
    color: '#9c27b0', 
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    color: '#9c27b0',
  },
  shoppingCartIcon: {
    color: '#9c27b0', 
    marginLeft: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '150px',
    marginLeft: '130px',
    color: '#9c27b0',
    
  },
}));

export default useStyles;