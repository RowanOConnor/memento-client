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
  // Get array of post IDs from Redux store
  const postIds = useSelector((state) =>
    (state.posts.posts)
      ? state.posts.posts.map((post) => post._id)
      : []
  );

  const classes = useStyles();

  return (
    (postIds)
      ? (postIds.length === 0)
        ? (
          <Paper className={classes.paper}>
            <Typography variant="h5">No memories to display... Yet!</Typography>
          </Paper>
        )
        : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {postIds.map((postId) => (
              <Grid key={postId} item xs={12} sm={12} md={6} lg={4}>
                <Post postId={postId} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )
      : <CircularProgress />
  );
}

export default Posts;