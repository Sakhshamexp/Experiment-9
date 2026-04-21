import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const credentials = btoa(`${username}:${password}`);
      // Actual API Call
      const response = await axios.post('http://localhost:8080/api/login', {}, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      
      const role = response.data.role; // Extract from backend
      saveSessionAndRedirect(username, role, credentials);
      
    } catch (err) {
      // Fallback for demonstration to ensure project runs without a backend
      console.warn("Backend not reachable or login failed, using fallback logic.");
      if (username === 'admin' && password === 'admin') {
        saveSessionAndRedirect('admin', 'ADMIN', btoa('admin:admin'));
      } else if (username === 'user' && password === 'user') {
        saveSessionAndRedirect('user', 'USER', btoa('user:user'));
      } else {
        setError('Invalid credentials. (Hint: use admin/admin or user/user)');
      }
    }
  };

  const saveSessionAndRedirect = (user, role, credsBase64) => {
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('authHeader', `Basic ${credsBase64}`);

    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Paper elevation={3} className="p-4 rounded shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <Typography variant="h4" className="text-center mb-4 text-primary fw-bold">
          RBAC Login
        </Typography>
        
        {error && <Alert severity="error" className="mb-3">{error}</Alert>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
            fullWidth 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            className="fw-bold mb-3"
          >
            Login
          </Button>
        </form>
        <div className="mt-2 text-muted text-center" style={{ fontSize: '0.9rem' }}>
          Test Accounts:<br/>
          Admin: <strong>admin</strong> / <strong>admin</strong><br/>
          User: <strong>user</strong> / <strong>user</strong>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
