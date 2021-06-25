// React
import React from 'react';

// React Redux
import { useSelector } from 'react-redux';

// Material UI Components
import { CircularProgress, Grid } from '@material-ui/core';

// React Components
import Post from './Post/Post.jsx';

import useStyles from './styles.js';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  console.log(posts);
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;