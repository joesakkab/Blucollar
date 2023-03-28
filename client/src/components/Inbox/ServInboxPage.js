import React from "react";
import {Typography, Button}  from "@material-ui/core";
import useStyles from '../Search/Styles';
import Review from './Review';

function ServInboxPage(props) {

  const classes = useStyles();

  if (props.status == "start") {
    return (
      <div>
        <Button
          className={classes.acceptButton}
          onClick={props.handleAccept}
        >
          Accept
        </Button>
        <Button
          className={classes.declineButton}
          onClick={props.handleDecline}
        >
          Decline
        </Button>
      </div>       
      
    )
  } else if (props.status == "accepted") {
    return (
      <div>
        <Button 
        className={classes.button}
        onClick={props.handleCompleted}>
          Job Completed
        </Button>
        
      </div>
    )
  } else if (props.status == "review") {
    return (
      <div>
        <Typography>
          <b>Please wait for customer review.</b>
        </Typography>
      </div>
    )
  } else if (props.status == "completed") {
    return (
      <div>
        <Typography>
          <b>Customer has added a review!</b>
        </Typography>
        <Review score={props.score} desc={props.desc}/>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
export default ServInboxPage;
