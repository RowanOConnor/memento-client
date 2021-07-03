// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux Actions
import { deletePost, likePost } from '../../../actions/postActions.js';

// Moment
import moment from 'moment';

// Material UI Components
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

// Component Styles
import useStyles from './styles.js';

const Post = ({ postId, setCurrentId }) => {
  const classes = useStyles();

  // Hooks
  const dispatch = useDispatch();

  // Get post with matching ID from Redux store
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );

  // Post still loading, return skeleton card
  if (!post) {
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">#tags</Typography>
        </div>
        <Typography className={classes.title} variant="h5">Title</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Message</Typography>
        </CardContent>
      </Card>
    );
  }

  const user = JSON.parse(localStorage.getItem('profile'));

  const LikeIcon = () => {
    if (post.likes.length > 0) {
      return (post.likes.find((like) => 
        (like === user?.profile?.googleId) || (like === user?.profile?._id)
      ) === -1)
        ? (
          <ThumbUpAltOutlined />
        )
        : (
          <ThumbUpAltIcon />
        );
    }

    return <ThumbUpAltOutlined />;
  }

  const userIsCreator = (post.creator === user?.profile?.googleId) || (post.creator === user?.profile?._id);

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      { (userIsCreator) && (
        <div className={classes.overlay2}>
          <Button
            style={{color: 'white' }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      ) }
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button color="primary" onClick={() => dispatch(likePost(post._id))}>
          <LikeIcon /> &nbsp; {post.likes.length}
        </Button>
        { (userIsCreator) && (
          <Button color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon />
          </Button>
        ) }
      </CardActions>
    </Card>
  );
}

export default Post;