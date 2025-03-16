import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './OutpassForm.css';

const OutpassForm = () => {
  const [timeOut, setTimeOut] = useState(null);
  const [timeIn, setTimeIn] = useState(null);
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timeOut || !timeIn || !reason.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    console.log({ timeOut, timeIn, reason });
  };

  return (
    <Box className="outpass-form-container">
      <Paper elevation={3} className="outpass-paper" sx={{ p: 4 }}>
        <Typography variant="h5" className="outpass-title">
          Outpass Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12}>
                <DateTimePicker
                  className="date-picker"
                  label="Time Out"
                  value={timeOut}
                  onChange={setTimeOut}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      required: true,
                      className: "form-field" 
                    } 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  className="date-picker"
                  label="Time In"
                  value={timeIn}
                  onChange={setTimeIn}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      required: true,
                      className: "form-field" 
                    } 
                  }}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}>
              <TextField
                className="reason-field form-field"
                fullWidth
                label="Reason"
                multiline
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="submit-button"
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default OutpassForm;
