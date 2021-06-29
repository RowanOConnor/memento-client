// React
import React, { useState } from 'react';

// React Router
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Redux Actions
import { AUTH } from '../../actions/actionTypes.js';
import { signin, signup } from '../../actions/authActions.js';

// Material UI Components & Icons
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Google Login
import { GoogleLogin } from 'react-google-login';

// React Components
import Input from './Input.jsx';
import Icon from './Icon.jsx';

// Styles
import useStyles from './styles.js';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const classes = useStyles();

  // Form state
  const [formData, setFormData] = useState(initialFormData);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Toggle sign up/sign in
  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
  }

  const googleSuccess = async (res) => {
    console.log(res);
    const profile = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { profile, token }});

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            ) }
            <Input name="email" label="Email" handleChange={handleChange} type="email" autoFocus={!isSignup}/>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password" }
              handleShowPassword={handleShowPassword}
            />
            { isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            ) }
          </Grid>
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="610408185493-h2rvoro5io85p9ppputpeu2uqve1u1bh.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign In with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up' }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;