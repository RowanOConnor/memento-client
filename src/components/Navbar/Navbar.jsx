// React
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { SIGN_OUT } from '../../actions/actionTypes.js';

// JWT
import decode from 'jwt-decode';

// Material UI Components
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';

// Custom styles
import useStyles from './styles.js';

// Navbar image
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const signOut = () => {
    dispatch({ type: SIGN_OUT });

    history.push('/');
    setUser(null);
  };

  const memoizedSignOut = useCallback(signOut, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;

    // Check for expired JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        memoizedSignOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, location, memoizedSignOut]);

  console.log(user);
  console.log(user?.profile);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60"/>
      </div>
      <Toolbar className={classes.toolbar}>
        { user
          ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.profile.name}
                src={user.profile.imageUrl}
              >
                {user.profile.name && user.profile.name.charAt[0]}
              </Avatar>
              <Typography className={classes.userName} variant="h6">{user.profile.name}</Typography>
              <Button className={classes.logout} variant="contained" color="secondary" onClick={signOut}>Logout</Button>
            </div>
          )
          : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
