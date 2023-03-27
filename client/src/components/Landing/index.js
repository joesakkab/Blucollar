import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import history from '../Navigation/history';
import * as ROUTES from '../../constants/routes';
import Cookies from 'js-cookies';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#2196f3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'DM Sans, sans-serif', // Set the font family to DM Sans
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
}));

function Landing() {
  const classes = useStyles();

  // Cookies.getItem('token') returns null
  console.log("Token cookies is", Cookies.getItem('token'))

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.title}>
        Need a HandyMan?
      </Typography>
      <div>
        <Typography variant="body1" className={classes.description}>
          Welcome to BluCollar, the platform to find service providers in any service you can think of!
        </Typography>
      </div>
      <Paper className={classes.paper}>
        <Button variant="contained" className={classes.button} onClick={() => history.push(ROUTES.SIGN_UP)}>
          Sign Up
        </Button>
        <Button variant="contained" className={classes.button} onClick={() => history.push(ROUTES.SIGN_IN)}>
          Login
        </Button>
      </Paper>
      
    </div>
  );
}

export default Landing;