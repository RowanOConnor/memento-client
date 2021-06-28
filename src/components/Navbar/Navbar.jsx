// React
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../actions/actionTypes.js';

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

  console.log(user);

  useEffect(() => {
    const token = user?.token;

    // JWT...

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token]);

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/');
    setUser(null);
  };

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
                {user.profile.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">{user.profile.name}</Typography>
              <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
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
