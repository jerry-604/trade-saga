

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} className="bg-white shadow-md">
      <Toolbar className="container mx-auto">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <div className="flex-grow" />

        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/about" passHref>
          <Button color="inherit">About</Button>
        </Link>
        <Link href="/features" passHref>
          <Button color="inherit">Features</Button>
        </Link>
        <Link href="/contact" passHref>
          <Button color="inherit">Contact</Button>
        </Link>

        <Button variant="outlined" className="ml-4">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
