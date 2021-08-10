import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, allPosts, setAllPosts }) => {

  const classes = useStyles();

  return (
    !allPosts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {allPosts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} allPosts = {allPosts} setAllPosts={setAllPosts} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
