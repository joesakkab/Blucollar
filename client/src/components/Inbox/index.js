import React from "react";
import theme from "../Search/theme";
import { MuiThemeProvider } from "@material-ui/core";
import NavigationBar from "../NavigationBar";
import Cookies from "js-cookies";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import CustInboxPage from "./CustInboxPage";
import ServInboxPage from "./ServInboxPage";
import NavBar from "../NavigationBar";
import jwt_decode from "jwt-decode";
import history from "../Navigation/history";
const serverURL = "";

// export default function Inbox() {
// 	return (
// 		<MuiThemeProvider theme={theme}>
// 			<NavigationBar />
// 		</MuiThemeProvider>
// 	)

// }
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#2196f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "DM Sans, sans-serif", // Set the font family to DM Sans
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "#fff",
    textAlign: "center",
  },
  description: {
    marginBottom: theme.spacing(4),
    color: "#fff",
    textAlign: "center",
    maxWidth: 600,
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Add space between the text and the buttons
    marginTop: theme.spacing(4),
    // backgroundColor: 'transparent', // Set the background color of the paper to transparent
  },
  button: {
    width: "60%", // Set the button width to 30% to allow space between them
    margin: theme.spacing(1),
    backgroundColor: "#2196f3", // Set the button background color to match the background color of the page
    color: "#fff", // Set the button text color to white
  },
}));

const initialMessages = [
  {
    id: 1,
    subject: "Welcome to My App",
    sender: "Admin",
    body: "Welcome to my app! This is just a demo message to show you how messages can be displayed on this page.",
  },
  {
    id: 2,
    subject: "Reminder: Meeting Tomorrow",
    sender: "John Doe",
    body: "Just a friendly reminder that we have a meeting tomorrow at 10am. See you then!",
  },
];


function InboxPage() {
  const [requests, setRequests] = useState([])
  let token = Cookies.getItem("token");
  const decodedToken = jwt_decode(token);
  console.log("decoded token is ", decodedToken);
  let userObj = decodedToken["obj"][0];
  console.log("User is ", userObj);

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


  const handleRender = () => {
    getRequests();
  }


  if (userObj["cust_id"] === null) {
    return (
      <div>
        <NavBar />
        <ServInboxPage />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <CustInboxPage />
      </div>
    );
  }
}
export default InboxPage;

