import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, ThemeProvider, MuiThemeProvider } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import NavBar from '../NavigationBar';
import data from "./sample-data.json"
import Rating from '@material-ui/lab/Rating'
import PrivateRoute from '../Navigation/PrivateRoute';
import history from '../Navigation/history';
import * as ROUTES from '../../constants/routes';
import { useState } from 'react';
import DisplaySearch from './DisplaySearch';
import Search from './Search';
import theme from './theme'
// import { appTheme } from '../../themes';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: 'DM Sans, sans-serif', // Set the font family to DM Sans
//   },
//   test: {
//     padding: theme.spacing(5),
//     // display: 'flex', 
//     // marginTop: theme.spacing(2), 
//     // borderRadius: 50
//   },
//   title: {
//     marginBottom: theme.spacing(2),
//     color: '#fff',
//     textAlign: 'center',
//   },
//   description: {
//     marginBottom: theme.spacing(4),
//     color: '#fff',
//     textAlign: 'center',
//     maxWidth: 600,
//     margin: '0 auto',
//   },
//   paper: {
//     padding: theme.spacing(3),
//     maxWidth: 400,
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: theme.spacing(4),
//     // backgroundColor: 'transparent', // Set the background color of the paper to transparent
//   },
//   button: {
//     width: '10%',
//     margin: theme.spacing(1),
//     // backgroundColor: '#2196f3', // Set the button background color to match the background color of the page
//     // color: '#fff', // Set the button text color to white
//   },
//   listing: {
//     padding: theme.spacing(1),
//   },
//   card: {
//     color: theme.palette.primary.main
//   }
// }));


const serverURL = "http://localhost:5000"
// const fetch = require("node-fetch");

export default function SearchForServiceProvider() {

  // Declaring states
  const [serviceProviders, setServiceProviders] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const callApiGetProviders = async () => {
    const url = serverURL + "/api/load";
    console.log(url + " Is working");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  React.useEffect(() => {
    getData();
  }, []);


  let getData = () => {
    callApiGetProviders()
      .then(res => {
        console.log("callApiGetProviders returned: ", res)
        setServiceProviders(res['results']);
    })
    
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <NavBar />
        <Grid>
          <Typography variant='h5' align='center' gutterBottom>
            Welcome to the search page!
            You can search any provider you would like by service.
          </Typography>

        </Grid>
        <Search
            handleSearchSubmit={setSearchTerm}
            setServiceProviders={setServiceProviders}
            searchTerm={searchTerm}
            serverURL={serverURL}
        />
        <DisplaySearch data={serviceProviders} />

      </div>
    </MuiThemeProvider>
    )
};

