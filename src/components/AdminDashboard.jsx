import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Alert, Chip, Grid } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [apiResponse, setApiResponse] = useState('');
  const [error, setError] = useState('');
  const role = sessionStorage.getItem('role');

  const fetchAdminData = async () => {
    try {
      const authHeader = sessionStorage.getItem('authHeader');
      const res = await axios.get('http://localhost:8080/api/admin/dashboard', {
        headers: { 'Authorization': authHeader }
      });
      setApiResponse(JSON.stringify(res.data, null, 2));
      setError('');
    } catch (err) {
      setApiResponse('Simulated Response: Hello Admin! System statistics loaded.');
      setError('Backend API is not running. Showing simulated admin data.');
    }
  };

  return (
    <div className="container mt-5">
      <Card elevation={4} className="shadow bg-white rounded border-top border-danger border-5">
        <CardContent>
          <Typography variant="h4" gutterBottom className="text-danger fw-bold">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" className="mb-4">
            Strictly Restricted Area. You have Full System Access.
            <br />
            Current Role: <Chip label={role} color="error" size="small" className="ms-2" />
          </Typography>

          <div className="mb-4">
            <Button variant="contained" color="error" onClick={fetchAdminData}>
              Call /api/admin/dashboard
            </Button>
          </div>

          {error && <Alert severity="warning" className="mb-3">{error}</Alert>}
          
          {apiResponse && (
            <div className="bg-dark text-success p-3 rounded border border-secondary shadow-sm">
              <strong>Secure API Response:</strong>
              <pre className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>{apiResponse}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
