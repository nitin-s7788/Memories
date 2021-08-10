import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';

import useStyles from './styles';
import * as api from '../../../api/index.js';   // import all from api

const Post = ({ post, allPosts, setAllPosts, setCurrentId }) => {

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))?.data;



  const likePost = async (post) => {
    try {

        console.log("likePost called");

      const { data } = await api.likePost(post._id);         // returns updated blog (not allblogs)

      console.log("updated post : ", data);

      setAllPosts( allPosts.map( (one_post) => ( one_post._id !== post._id ? one_post : data ) )  );

    } catch (error) {
      console.log(error.message);
    }
  };
  
const deletePost = async (post) => {
    try {

        console.log("deletePost called");

      await api.deletePost(post._id);

      setAllPosts( allPosts.filter( (one_post) => one_post._id !== post._id ) );
  
    } catch (error) {
      console.log(error.message);
    }
  };



  const Likes = () => {
    //   console.log(post);
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      { (user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => likePost(post)}>
          <Likes />
        </Button>
        {( user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => deletePost(post) }>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
