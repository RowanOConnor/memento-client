// React
import React, { useState, useEffect } from 'react'

// Redux
import { useDispatch } from 'react-redux';

// Redux Actions
import { getPosts } from '../../actions/postActions.js';

// React Components
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import Pagination from '../Pagination/Pagination.jsx';

// Material UI Components
import { Container, Grow, Grid, Paper } from '@material-ui/core';

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6}>
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
