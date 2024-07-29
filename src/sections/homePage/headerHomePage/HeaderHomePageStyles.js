import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor:'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height:'100px',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:'100%'
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