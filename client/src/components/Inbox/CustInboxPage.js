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
import NavBar from "../NavigationBar";
import jwtDecode from "jwt-decode";
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



function CustInboxPage() {
  const classes = useStyles();
  const [messages, setMessages] = useState(initialMessages);

  const handleAccept = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          return { ...message, status: "Accepted" };
        }
        return message;
      })
    );
  };

  const handleDecline = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          return { ...message, status: "Declined" };
        }
        return message;
      })
    );
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <Typography variant="h4" className={classes.title}>
        Inbox
      </Typography>
      {messages.length === 0 ? (
        <Typography variant="body1" className={classes.description}>
          You have no messages.
        </Typography>
      ) : (
        messages.map((message) => (
          <Paper key={message.id} className={classes.paper}>
            <div>
              <Typography variant="h6">{message.subject}</Typography>
              <Typography variant="subtitle1">
                From: {message.sender}
              </Typography>
              <Typography variant="body1">{message.body}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.acceptButton}
                onClick={() => handleAccept(message.id)}
              >
                Review
              </Button>
            </div>
          </Paper>
        ))
      )}
    </div>
  );
}
export default CustInboxPage;
