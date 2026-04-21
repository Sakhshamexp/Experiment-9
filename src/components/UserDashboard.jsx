import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Alert, Chip } from '@mui/material';
import axios from 'axios';

const UserDashboard = () => {
  const [apiResponse, setApiResponse] = useState('');
  const [error, setError] = useState('');
  const role = sessionStorage.getItem('role');

  const fetchProfile = async () => {
    try {
      const authHeader = sessionStorage.getItem('authHeader');
      const res = await axios.get('http://localhost:8080/api/user/profile', {
        headers: { 'Authorization': authHeader }
      });
      setApiResponse(JSON.stringify(res.data, null, 2));
      setError('');
    } catch (err) {
      // Fallback display
      setApiResponse('Simulated Response: Hello User! This is your profile data.');
      setError('Backend API is not running. Showing simulated data.');
    }
  };

  return (
    <div className="container mt-5">
      <Card elevation={4} className="shadow">
        <CardContent>
          <Typography variant="h4" gutterBottom className="text-primary fw-bold">
            User Dashboard
          </Typography>
          <Typography variant="body1" className="mb-3">
            Welcome to the User Dashboard! You have access to user features. 
            <br />
            Current Role: <Chip label={role} color="info" size="small" className="ms-2" />
          </Typography>

          <Button variant="outlined" color="primary" onClick={fetchProfile} className="mb-4">
            Call /api/user/profile
          </Button>

          {error && <Alert severity="warning" className="mb-3">{error}</Alert>}
          
          {apiResponse && (
            <div className="bg-light p-3 rounded border">
              <strong>API Response:</strong>
              <pre className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>{apiResponse}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
