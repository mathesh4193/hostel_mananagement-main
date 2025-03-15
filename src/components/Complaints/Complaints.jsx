import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Snackbar, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';
import './Complaints.css';

const Complaints = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    emailjs.init("E5morAfrIunaazqjt");
  }, []);

  const [complaint, setComplaint] = useState({
    subject: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const templateParams = {
        subject: complaint.subject,
        message: complaint.description,
        timestamp: new Date().toLocaleString(),
        from_name: 'VCET Hostel Student',
        to_name: 'Hostel Administration'
      };

      await emailjs.send(
        'service_qtshmw7',
        'template_925omx1',
        templateParams,
        'E5morAfrIunaazqjt'
      );

      setSnackbarMessage('Complaint submitted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setComplaint({ subject: '', description: '' });
    } catch (error) {
      console.error('Error sending complaint:', error);
      setSnackbarMessage('Failed to submit complaint. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="complaints-container">
      <Typography variant="h4" className="complaints-title">
        Submit a Complaint
      </Typography>
      
      <Paper elevation={3} className="complaints-form-container">
        <form onSubmit={handleSubmit}>
          <Box className="form-field">
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={complaint.subject}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{
                style: { color: 'white' }
              }}
            />
          </Box>

          <Box className="form-field">
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={complaint.description}
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{
                style: { color: 'white' }
              }}
            />
          </Box>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="submit-button"
          >
            Submit Complaint
          </Button>
        </form>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Complaints;
