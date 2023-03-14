import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import NavBar from '../NavigationBar';
import Rating from '@material-ui/lab/Rating'
import PrivateRoute from '../Navigation/PrivateRoute';
import { useParams } from 'react-router-dom';
import DisplayProfile from './DisplayProfile';

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

const serverURL = ""

function Profile() {
  const classes = useStyles();
//   const params = new URLSearchParams(window.location.pathname)
  const params = useParams();
  const [profile, setProfile] = useState([]);

  const callApiProfile = async (given_id) => {
    const url = serverURL + "/api/getprofile";
    const profileID = JSON.stringify({"id": Number(given_id)})
    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: profileID,
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  useEffect(() => {
    const given_id = params.id
    getProfileData(given_id);
  }, []);

  let getProfileData = (given_id) => {
    callApiProfile(given_id)
    .then(res => {
      console.log("callApiProfile profile data returned: ", res)
      setProfile(res["results"])
    })
  }
  // Get request body using API and id as prop. Set it equal to 'body' variable.
  //const results = callApiProfile(given_id)
  //console.log(results)

  return (
    <div>
        <NavBar />

            <div className={classes.listing}>
                <DisplayProfile data={profile}/>
            </div>
        
      
    </div>
  );
}

export default Profile;