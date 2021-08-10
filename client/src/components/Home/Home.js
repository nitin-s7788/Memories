import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import * as api from '../../api/index.js';   // import all from api

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

const [allPosts, setAllPosts] = useState([]);

const getAllPosts = async ( ) => {
    try {

        console.log("getAllPosts called");

      const { data } = await api.fetchPosts();

      setAllPosts(data);
  
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect( ()=>{
      getAllPosts();
  }, [] );

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} allPosts = {allPosts} setAllPosts = {setAllPosts} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} allPosts={allPosts} setAllPosts={setAllPosts} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
