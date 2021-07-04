// React / Redux
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { commentOnPost } from '../../actions/postActions.js';

// Material UI
import { Typography, TextField, Button } from '@material-ui/core';

// Styles
import useStyles from './styles.js';

const CommentsSection = ({ postId }) => {
  // Styles
  const classes = useStyles();

  // Hooks
  const dispatch = useDispatch();
  const scrollRef = useRef();

  // State
  const [tfValue, setTfValue] = useState('');
  const comments = useSelector((state) => state.posts.post.comments);
  const user = JSON.parse(localStorage.getItem('profile'));

  const clear = () => {
    setTfValue('');
  }
  
  const handleClick = () => {
    const comment = `${user.profile.name}: ${tfValue}`;
    dispatch(commentOnPost(postId, comment));
    clear();
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">Comments</Typography>
        { comments.map((comment, index) => (
          <Typography key={index} variant="subtitle1">
            <strong>{comment.split(': ')[0]}</strong>
            {comment.split(':')[1]}
          </Typography>
        )) }
        <div ref={scrollRef} />
      </div>
      { user && 
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a Comment</Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={tfValue}
            onChange={(e) => setTfValue(e.target.value)}
          />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!tfValue}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      }
    </div>
  )
}

export default CommentsSection;
