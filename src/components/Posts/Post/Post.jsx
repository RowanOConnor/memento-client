// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Redux Actions
import { deletePost, likePost } from '../../../actions/postActions.js';

// Moment
import moment from 'moment';

// Material UI Components
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

// Component Styles
import useStyles from './styles.js';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{color: 'white' }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon /> &nbsp; {post.likes.length}
        </Button>
        <Button color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;