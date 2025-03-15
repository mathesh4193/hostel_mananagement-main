import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setUserId('');
    setPassword('');
    setError('');
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    // Clear previous errors
    setError('');

    // Validate Roll Number format for students (22CSEA44)
    const rollNoPattern = /^[0-9]{2}[A-Za-z]{4}[0-9]{2}$/i;
    if (role === 'Student') {
      if (!rollNoPattern.test(userId)) {
        setError('Roll number should be in format: 22CSEA44');
        return false;
      }
      // Convert roll number to uppercase
      setUserId(userId.toUpperCase());
    }

    // Validate Password (12 digits)
    const passwordPattern = /^[0-9]{12}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be exactly 12 digits');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userId,
        password,
        role: role.toLowerCase(),
      });

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', role.toLowerCase());
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', response.data.userName);

        // Navigate based on role
        if (role === 'Student') {
          navigate('/student-dashboard');
        } else if (role === 'Warden') {
          navigate('/warden-dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    if (!role || !userId) {
      setError('Please select a role and enter your ID to reset password');
      return;
    }
    // You can add navigation or modal for password reset
    alert(`Password reset link will be sent to registered email for ${role}: ${userId}`);
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <p>Please select your role and enter your credentials</p>

      <div className="role-selection">
        {['Student', 'Warden'].map((r) => (
          <button 
            key={r} 
            className={`role-button ${role === r ? 'selected' : ''}`} 
            onClick={() => handleRoleSelection(r)}
          >
            <div>{r}</div>
            <small>Enter {r === 'Student' ? 'Roll Number' : 'Warden ID'} & Password</small>
          </button>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      {role && (
        <form onSubmit={handleSubmit}>
          <label>
            {role === 'Warden' ? 'Warden ID' : 'Roll Number'}
            <input 
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={`Enter ${role === 'Warden' ? 'Warden ID' : 'Roll Number'}`}
              required
            />
          </label>
          <label>
            Password
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <IconButton className="password-toggle" onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </label>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      )}

      <button 
        onClick={handleForgotPassword}
        className="forgot-password"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default SignIn;
