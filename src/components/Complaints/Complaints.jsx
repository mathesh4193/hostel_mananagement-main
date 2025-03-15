import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import emailjs from '@emailjs/browser';
import './Complaints.css';

const Complaints = () => {
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
      await emailjs.send(
        'service_qtshmw7',
        'template_pd8c173',
        {
          subject: complaint.subject,
          message: complaint.description,
        },
        'E5morAfrIunaazqjt'
      );

      alert('Complaint submitted successfully!');
      setComplaint({ subject: '', description: '' });
    } catch (error) {
      console.error('Error sending complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value
    });
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
    </Container>
  );
};

export default Complaints;
