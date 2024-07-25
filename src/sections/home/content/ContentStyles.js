import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80%', 
    margin: '0 auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  item1: {
    flex: '1 1 16.6667%', 
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: '#f5f5f5', 
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '16px',
  },
  menuItem: {
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  filterSection: {
    marginTop: '16px',
  },
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  item2: {
    flex: '5 1 83.3333%', // Chiếm 5/6 chiều ngang
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  sortBar: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  sortButton: {
    color: '#9c27b0',
    border: '1px solid #9c27b0',
    marginBottom: '8px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    height: '300px', // Chiều cao cố định cho card
  },
  productImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '150px', // Chiều cao tối đa cho hình ảnh
    objectFit: 'contain',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // Đảm bảo card content chiếm toàn bộ chiều cao
  },
}));

export default useStyles;