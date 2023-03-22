import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import NavBar from '../NavigationBar';
import data from "../Search/sample-data.json"
import Rating from '@material-ui/lab/Rating'
import PrivateRoute from '../Navigation/PrivateRoute';
import Cookies from 'js-cookies';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'DM Sans, sans-serif', // Set the font family to DM Sans
  },
  test: {
    padding: theme.spacing(5),
    // display: 'flex', 
    // marginTop: theme.spacing(2), 
    // borderRadius: 50
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    marginBottom: theme.spacing(4),
    color: '#fff',
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    // backgroundColor: 'transparent', // Set the background color of the paper to transparent
  },
  button: {
    width: '100%',
    margin: theme.spacing(1),
    backgroundColor: '#2196f3', // Set the button background color to match the background color of the page
    color: '#fff', // Set the button text color to white
  },
  listing: {
    padding: theme.spacing(1),
  },
  card: {
    color: theme.palette.primary.main
  } 
}));


function MyProfile() {
  const classes = useStyles();
  const obj = data[0]
  return (
    <div>
        <NavBar />

            <div className={classes.listing}>
              <Typography id="greeting" variant="h2" className={classes.test}>
                Welcome to your profile page!
              </Typography>
              <Typography id="title" variant="h4" className={classes.test2}>
                {obj.first + " " + obj.last}
              </Typography>
              <Typography id="service-type" variant="h6" className={classes.test2}>
                Service Type: {obj["serviceType"]}
              </Typography>
              <Typography id="description">
                Description: {obj.description}
              </Typography>
              <Typography sx={{fontWeight: 'bold'}} id="location">
                Location: {obj["primaryLocation"]}
              </Typography>
              <Rating name="half-rating-read" defaultValue={obj.rating} precision={0.1} readOnly />
              <Typography>
                Rating: {obj.rating + " / 5.0"}
              </Typography>
            </div>
        
      
    </div>
  );
}

export default MyProfile;