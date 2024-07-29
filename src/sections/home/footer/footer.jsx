import React from 'react';

import { Box, IconButton } from '@mui/material';
import { YouTube, Facebook, Instagram } from '@mui/icons-material';

import useStyles from './FooterStyles';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Box className={classes.container}>
        <div className={classes.logo}>
          <p> MORMarket@2024</p>
        </div>
        <Box className={classes.socialIcons}>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener"
            className={classes.iconButton}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener"
            className={classes.iconButton}
          >
            <Instagram />
          </IconButton>
          <IconButton
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener"
            className={classes.iconButton}
          >
            <YouTube />
          </IconButton>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
