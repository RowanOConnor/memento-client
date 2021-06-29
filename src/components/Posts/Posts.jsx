// React
import React from 'react';

// React Redux
import { useSelector } from 'react-redux';

// Material UI Components
import { CircularProgress, Grid, Typography, Paper } from '@material-ui/core';

// React Components
import Post from './Post/Post.jsx';

import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  
  return (
    posts === null
      ? <CircularProgress />
      : posts.length === 0
        ? (
          <Paper className={classes.paper}>
            <Typography variant="h5">No memories to display... Yet!</Typography>
          </Paper>
        )
        : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )
  );
}

export default Posts;