import { Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Button ,InputBase,InputAdornment,  } from '@mui/material';

import useStyles from './headerHomePageStyles';

const HeaderHomePage = () => {

    const classes = useStyles();
    return (
            <AppBar position="static" className={classes.appBar} sx={{ backgroundColor:'white' }}>
                <div className={classes.container}>
                <div className={classes.item1}>
                <div className={classes.Buttons}>
              <Button sx={{ color: 'Black' }} className={classes.Button}>
                Trang Chủ
              </Button>
              <Button sx={{ color: 'black' }} className={classes.Button}>
                Mua Bán
              </Button>
            </div>
                </div>
                <div className={classes.item2}>
                <div className={classes.logo}>
            <img src="/favicon/logo-mor.jpg" alt="Logo" />
          </div>
                </div>
                <div className={classes.item3}>
                <InputBase
                placeholder="Tìm kiếm…"
                className={classes.searchInput}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                }
              />
          
              <Button sx={{ color: 'black' }} className={classes.loginButton}>
                Đăng nhập
              </Button>
              <Button sx={{ color: 'black' }} className={classes.loginButton}>
                Đăng ký
              </Button>
            </div>
                   
                </div>
            </AppBar>
    )
}

export default HeaderHomePage;