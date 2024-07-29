import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
  productInfo: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productName: {
    flexGrow: 1,
  },
  buyNowButton: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
