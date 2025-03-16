import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Snackbar, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';
import './Complaints.css';

const Complaints = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    emailjs.init("E5morAfrIunaazqjt"); // Initialize EmailJS
  }, []);

  const [complaint, setComplaint] = useState({
    subject: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaint.subject || !complaint.description) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      console.log("Sending complaint...");

      const templateParams = {
        subject: complaint.subject,
        message: complaint.description,
        timestamp: new Date().toLocaleString(),
        from_name: 'VCET Hostel Student',
        to_name: 'Hostel Administration',
        to_email: 'mathinash58@gmail.com', // Change to another test email if needed
        reply_to: 'your_verified_email@example.com' // Use an email verified in EmailJS
      };

      const response = await emailjs.send(
        'service_qtshmw7',   // Your EmailJS service ID
        'template_pd8c173',  // Your EmailJS template ID
        templateParams,
        'E5morAfrIunaazqjt'  // Your EmailJS public key
      );

      console.log("EmailJS Response:", response);

      if (response.status === 200) {
        setSnackbarMessage('Complaint submitted successfully!');
        setSnackbarSeverity('success');
        setComplaint({ subject: '', description: '' });
      } else {
        throw new Error(`Unexpected response: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
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

      {/* Snackbar for Notifications */}
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
