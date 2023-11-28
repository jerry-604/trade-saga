// components/Header.tsx

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Button, Box, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 100, backgroundColor: 'black',  }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Text */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ padding: '0px', marginRight: '8px' }}>
            <img src="/tradesaga-logo.png" alt="TradeSaga Logo" style={{ width: 40, height: 40 }} />
          </IconButton>
          <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' } }}>
            TradeSaga
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          <Link href="#home" passHref><Button color="inherit">Home</Button></Link>
          <Link href="#about" passHref><Button color="inherit">About</Button></Link>
          <Link href="#features" passHref><Button color="inherit">Features</Button></Link>
          <Link href="#contact" passHref><Button color="inherit">Contact</Button></Link>
        </Box>

        {/* Login and Signup Buttons */}
        <Box>
          <Button color="inherit" href='/login' variant="outlined" sx={{ borderRadius: 20, marginRight: 1 }}>Login</Button>
          <Button color="primary" href='/registration' variant="contained" sx={{ borderRadius: 20 }}>Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
