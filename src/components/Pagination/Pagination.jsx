// React/Redux
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/postActions.js';

// Material UI
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles.js';

const Paginate = ({ page }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts());
  }, []);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={page}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
}

export default Paginate;