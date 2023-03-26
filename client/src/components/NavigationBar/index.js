import React from 'react';
import history from '../Navigation/history';
// import Box from '@material-ui/core/Box';
// import Toolbar from '@material-ui/core/Toolbar';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import { Box, Typography, Toolbar, AppBar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    appBar: {
        backgroundColor: '#fff',
        color: '#fff',
    },
    mainText: {
      color: '#486284', 
      fontFamily: 'DM Sans, sans-serif',
      my: 2,
      display: 'block'

    }, 
    bluecollar: {
      color: "#7B95B7",
      variant: "h5" ,
      component: "div" ,
      flexGrow: 1,
      fontFamily: 'DM Sans, sans-serif'
    }
  }));

  const pages = ['Search', 'Profile', 'Sign Out']

const NavBar = () => {
    const classes = useStyles();

    const handleSignOut = () => {
      Cookies.removeItem('token')
      history.push(ROUTES.LANDING)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                  <Typography className={classes.bluecollar}>
                      BluCollar
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button
                          className={classes.mainText}
                          onClick = {() => history.push(ROUTES.SEARCH)}
                        >
                          Search                        
                        </Button>

                      <Button
                          className={classes.mainText}
                          onClick = {() => history.push(ROUTES.INBOX)}
                      >
                          Inbox
                      </Button>

                        <Button
                          className={classes.mainText}
                          onClick = {() => history.push(ROUTES.MYPROFILE)}
                        >
                          Profile
                        </Button>

                        <Button
                          className={classes.mainText}
                          onClick = {handleSignOut}
                        >
                          Sign Out
                        </Button>

                  </Box>
                </Toolbar>
            </AppBar>
        </Box>
      );
}

export default NavBar;