import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  content: {
   
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container: {
    width: '60%', 
    display: 'flex',
    flexWrap:'warp',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    paddingTop:'64px'
  },
  item1: {
    
  },
  item2: {
   
  },
  item3: {
   display:'flex',
   justifyContent: 'flex-end',
  },
  Buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  Button: {
    
  },
  searchContainer: {
  color:'black'
  },
  search: {
   color:'black'
  },
  searchInput: {
    color:'black',
    backgroundColor:'rgb(244, 245, 251)',
    height:'48px',
    borderRadius:'30px'
  },
  searchIcon: {
   color:'black',
  
  },
  shoppingCartIcon: {
   
  },
  logo: {

  },
}));

export default useStyles;