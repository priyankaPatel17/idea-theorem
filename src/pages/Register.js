import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  TextField,
  MenuItem,
  Alert
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import '../../src/register.css';
import { styled } from '@mui/system';


const Register = () => {
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    password: '',
    day: '',
    date_of_birth: '',
    month: '',
    year: '',
    confirm_password: '',
    error: '',
    success: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Email validation using regex
    if (e.target.name == 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      setError(!isValidEmail);
    }

    setAlert(null);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setAlert({ severity: 'error', message: 'Passwords do not match' });
      return;
    }
    const dateOfBirth = formData.year +' '+ formData.month  +' '+ formData.day;
    setFormData({
      ...formData,
      date_of_birth: dateOfBirth,
    });
    await new Promise(resolve => setTimeout(resolve, 0));

    try {

      const response = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', formData);

      if (response.data.title == 'Success') {
        setAlert({ severity: 'success', message: 'User account successfully created.' });

        setFormData({
          full_name: '',
          email: '',
          contact_number: '',
          password: '',
          day: '',
          month: '',
          year: '',
          confirm_password: '',
          error: '',
          success: ''
        });

      } else {
        setAlert({ severity: 'error', message: 'An error occurred' });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ severity: 'error', message: 'An error occurred while submitting the form' });
    }
  };

  // Generate options for days (1 to 31)
  const dayOptions = [];
  for (let i = 1; i <= 31; i++) {
    dayOptions.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
  }

  // Generate options for months (January to December)
  const monthOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
  ].map(month => (
    <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
  ));

  // Generate options for years (from current year to 100 years back)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= currentYear - 100; year--) {
    yearOptions.push(<MenuItem key={year} value={year}>{year}</MenuItem>);
  }

  // Apply margin top directly
  const MarginTopGrid = styled(Grid)({
    marginTop: 30, // This will add margin top of 24px
  });

  return (
    <>
      <Container maxWidth="xs">
        <div>
          <h1>Create User Account</h1>
          {alert && <Alert className='alert' severity={alert.severity}>{alert.message}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid className="box-layer" container spacing={2} direction="column">
              <Grid item>
                <label className='label'>Full Name</label>
              </Grid>

              <Grid item>
                <TextField
                  name="full_name"
                  required
                  fullWidth
                  id="full_name"
                  label="Full Name"
                  autoFocus
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item>
                <label className='label'>Contact Number</label>
              </Grid>

              <Grid item>
                <TextField
                  name="contact_number"
                  required
                  fullWidth
                  id="contact_number"
                  label="Contact Number"
                  autoFocus
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item>
                <label className='label'>Birthdate</label>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    select
                    required
                    label="Day"
                    fullWidth
                    id="day"
                    name="day"
                    variant="outlined"
                    value={formData.day}
                    onChange={handleChange}
                  >
                    {dayOptions}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    select
                    required
                    label="Month"
                    fullWidth
                    id="month"
                    name="month"
                    variant="outlined"
                    value={formData.month}
                    onChange={handleChange}
                  >
                    {monthOptions}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    select
                    required
                    label="Year"
                    fullWidth
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {yearOptions}
                  </TextField>
                </Grid>
              </Grid>

              <Grid item>
                <label className='label'>Email Address</label>
              </Grid>
              <Grid item>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  error={error} // Set error prop to true to display error style
                  helperText={error ? 'Sorry, this email address is not valid, Please try again.' : ''}
                />
              </Grid>

              <Grid item>
                <label className='label'>Password</label>
              </Grid>
              <Grid item>

                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>


              <Grid item>
                <label className='label'>Confirm Password</label>
              </Grid>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  pattern="^.{6,}$"
                />
              </Grid>
            </Grid>
            <MarginTopGrid container spacing={2} justifyContent="center">
              <Grid item>
                <Button className='cancel-btn' variant="outlined">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button className='submit-btn' type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </MarginTopGrid>
          </form>
        </div>
      </Container>
    </>

  );
};

export default Register;
