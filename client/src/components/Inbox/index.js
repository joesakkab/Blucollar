import React from "react";
import Cookies from "js-cookies";
import { useState } from "react";
import CustInboxPage from "./CustInboxPage";
import ServInboxPage from "./ServInboxPage";
import NavBar from "../NavigationBar";
import jwt_decode from "jwt-decode";
import history from "../Navigation/history";
import useStyles from '../Search/Styles';
import theme from "../Search/theme";
import {Typography, Card, CardActionArea, MuiThemeProvider, CardContent, Paper}  from "@material-ui/core";
// import initialMessages from './initialMessages.json';
import DisplayServiceReqs from './DisplayServiceReqs';
import * as FIELDS from '../../constants/serviceRequestConst';

const serverURL = "";


// const initialMessages = [
//   {
//     id: 1,
//     subject: "Welcome to My App",
//     sender: "Admin",
//     body: "Welcome to my app! This is just a demo message to show you how messages can be displayed on this page.",
//   },
//   {
//     id: 2,
//     subject: "Reminder: Meeting Tomorrow",
//     sender: "John Doe",
//     body: "Just a friendly reminder that we have a meeting tomorrow at 10am. See you then!",
//   },
// ];


export default function InboxPage() {

  // decalre states
  const [requests, setRequests] = useState([]);
  let token = Cookies.getItem("token");
  const decodedToken = jwt_decode(token);
  console.log("decoded token is ", decodedToken);
  let userObj = decodedToken["obj"][0];
  let custId = userObj[FIELDS.CUST_ID];
  console.log("User is ", userObj);
  const classes = useStyles();

  const getRequests = () => {
    callApiGetRequests().then(res => {
      console.log("callApiGetServiceRequests returned: ", res)
      setRequests(res['results'])
    })
  }
  
  const callApiGetRequests = async () => {
    const url = serverURL + "/api/getservicerequests";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + Cookies.getItem('token')
      },
      auth: "Bearer " + Cookies.getItem("token"),
    });
    const body = await response.json();
    if (response.status !== 200) {
      // setStatus(response.status);
      alert(body.error)
      return // no body returned
    }
    return body;
  }

  React.useEffect(() => {
    getRequests();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <NavBar />
        <div>
          <Typography variant="h4" className={classes.title}>
            Inbox
          </Typography>
          {requests.length === 0 ? (
            <Typography variant="body1" className={classes.description}>
              You have no messages.
            </Typography>
          ) : (
            requests.map((request) => (
              <div className={classes.listing}>
                <DisplayServiceReqs 
                requestData={request} 
                handleRender={getRequests}
                custId={custId}
                />
              </div>
            ))
          )};
        </div>       

        </ div>
    </MuiThemeProvider>
  );
}
