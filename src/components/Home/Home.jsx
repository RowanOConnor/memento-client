// React
import React, { useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Redux Actions
import { getPostsBySearch } from '../../actions/postActions.js';

// React Components
import Posts from '../Posts/Posts.jsx';
import Form from '../Form/Form.jsx';
import Pagination from '../Pagination/Pagination.jsx';

// Material UI Components
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

// Styles
import useStyles from './styles.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();

  // Redux Hooks
  const dispatch = useDispatch();

  // React State
  const [currentId, setCurrentId] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [tags, setTags] = useState([]);

  // 
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;

  const searchPosts = () => {
    if (searchString.trim() || tags.length !== 0) {
      // Get first page of search results
      const newPage = 1;
      dispatch(getPostsBySearch({ q: searchString, tags: tags.join(',') }, newPage));
      history.push(`/posts/search?page=${newPage}&q=${searchString || 'none'}&${tags.join(',')}`);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPosts();
    }
  }

  const handleAdd = (newTag) => {
    setTags([ ...tags, newTag ])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button className={classes.searchButton} onClick={searchPosts} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
