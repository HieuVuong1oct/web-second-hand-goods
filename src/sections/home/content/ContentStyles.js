import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
  },
  item1: {
    flexBasis: '16.6667%', 
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '16px',
  },
  item2: {
    flexBasis: '83.3333%', 
    padding: '16px',
  },
  sortBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  sortButton: {
    border: '1px solid #9c27b0',
    color: '#9c27b0',
    marginRight: '8px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  productCard: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
}));

export default useStyles;