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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './OutpassForm.css';

const OutpassForm = () => {
  const [dateOut, setDateOut] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [dateIn, setDateIn] = useState(null);
  const [timeIn, setTimeIn] = useState(null);
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateOut || !timeOut || !dateIn || !timeIn || !reason.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    console.log({ dateOut, timeOut, dateIn, timeIn, reason });
  };

  return (
    <Box className="outpass-form-container">
      <Paper elevation={6} className="outpass-paper">
        <Typography variant="h5" className="outpass-title">
          Outpass Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date Out"
                  value={dateOut}
                  onChange={setDateOut}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time Out"
                  value={timeOut}
                  onChange={setTimeOut}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date In"
                  value={dateIn}
                  onChange={setDateIn}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time In"
                  value={timeIn}
                  onChange={setTimeIn}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}>
              <TextField
                className="reason-field form-field"
                fullWidth
                label="Reason for Outpass"
                multiline
                rows={3}
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
