import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';

import * as api from '../../api/index.js';   // import all from api

const Form = ({ currentId, setCurrentId, allPosts, setAllPosts }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))?.data;

  useEffect(() => {
    if(currentId === 0)
    {
      //   post = null;
        setPostData( { creator: '', title: '', message: '', tags: '', selectedFile: '' } )
    }
    else
    {
        setPostData( allPosts.find( (one_post) => one_post._id === currentId ) );
    }
  
}, [currentId]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };


  const createPost = async (post) => {
    try {

        console.log("createPost called");

      const { data } = await api.createPost(post);      // return the new created post

      setAllPosts([ ...allPosts, data ]);
  
    } catch (error) {
      console.log(error.message);
    }
};
  
const updatePost = async (id, post) => {
    try {

        console.log("updatePost called");

      const { data } = await api.updatePost(id, post);    // return the updated blog

      console.log("updated post : ", data);

      setAllPosts( allPosts.map( (one_post) => one_post._id !== id ? one_post : data ) );

      console.log("allPosts updated");
  
    } catch (error) {
      console.log(error.message);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
        createPost(postData);
      clear();
    } else {
        updatePost(currentId, postData);
      clear();
    }
  };



  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${postData.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
