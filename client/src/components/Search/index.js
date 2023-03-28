import React from 'react';
import { Grid, Typography, MuiThemeProvider } from '@material-ui/core';
import NavBar from '../NavigationBar';
import DisplaySearch from './DisplaySearch';
import Search from './Search';
import theme from './theme';
import Cookies from 'js-cookies';


const serverURL = ""

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
      },
      auth: {"token" : Cookies.getItem("token")}
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
    console.log("Cookie of token is", Cookies.getItem("token"))
    
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

