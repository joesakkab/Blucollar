import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import NavBar from '../NavigationBar';
import data from "../Search/sample-data.json"
import Rating from '@material-ui/lab/Rating'
import PrivateRoute from '../Navigation/PrivateRoute';
import Cookies from 'js-cookies';
import ServiceProviderProfile from './ServiceProviderProfile';
import CustomerProfile from './CustomerProfile'
import jwt_decode from 'jwt-decode';

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

  // parse the token 
  // if the isServiceProvider is true, 
  // display the ServiceProvoiderProfile component
  // else display the CustomerProfile component
  let token = Cookies.getItem('token')
  const decodedToken = jwt_decode(token);
  console.log("decoded token is ", decodedToken)
  let userObj = decodedToken['obj'][0]
  console.log("User is ", userObj)
  if (userObj["cust_id"] === null) {
    return (
      <div>
          <NavBar />
          <ServiceProviderProfile profileData={userObj}/>
      </div>
    );
  } else {
    return (
      <div>
          <NavBar />
          <CustomerProfile profileData={userObj}/>
      </div>
    );
  }
  
}

export default MyProfile;