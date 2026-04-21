import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (!username) return null; // Don't show navbar on login page

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RBAC App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Welcome, <strong>{username}</strong> ({role})
          </Typography>
          {role === 'ADMIN' && (
             <Button color="inherit" onClick={() => navigate('/admin')}>
               Admin Panel
             </Button>
          )}
          <Button color="inherit" onClick={() => navigate('/user')}>
            User Dashboard
          </Button>
          <Button color="error" variant="contained" onClick={handleLogout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
