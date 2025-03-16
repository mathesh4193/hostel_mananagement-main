import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// Remove the unused axios import
// import axios from 'axios';
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
    setError('');

    if (role === 'Student') {
      const rollNoPattern = /^[0-9]{2}[A-Za-z]{4}[0-9]{2}$/i;
      if (!rollNoPattern.test(userId)) {
        setError('Roll number should be in format: 22CSEA44');
        return false;
      }
      setUserId(userId.toUpperCase());
    } else if (role === 'Warden') {
      // Warden ID format: WARDEN123
      const wardenPattern = /^WARDEN[0-9]{3}$/i;
      if (!wardenPattern.test(userId)) {
        setError('Warden ID should be in format: WARDEN123');
        return false;
      }
      setUserId(userId.toUpperCase());
    }

    // Example: Password should be 12 digits like: 123456789012
    const passwordPattern = /^[0-9]{12}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be exactly 12 digits (e.g., 123456789012)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Mock successful login for testing
      if (role === 'Student' && userId && password) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'student');
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userId);
        navigate('/student-dashboard');
        return;
      }
      
      // Warden login
      if (role === 'Warden' && userId && password) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'warden');
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userId);
        navigate('/warden-dashboard');  // Update this to match App.js route
        return;
      }

      // Actual API call (uncomment when backend is ready)
      /*
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userId,
        password,
        role: role.toLowerCase(),
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', role.toLowerCase());
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', response.data.userName);

        if (role === 'Student') {
          navigate('/student-dashboard');
        } else if (role === 'Warden') {
          navigate('/warden-dashboard');
        }
      }
      */
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
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
