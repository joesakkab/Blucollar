import React from "react";
import {Typography, Paper}  from "@material-ui/core";
import useStyles from '../Search/Styles';
import CustInboxPage from "./CustInboxPage";
import ServInboxPage from "./ServInboxPage";
import * as FIELDS from '../../constants/serviceRequestConst';

export default function DisplayServiceReqs(props) {
  const serverURL = "";
  const classes = useStyles();
  const request = props.requestData;
  const sr_id = request[FIELDS.SR_ID];
  const [status, setStatus] = React.useState(request[FIELDS.STATUS]);
  const [reviewDesc, setReviewDesc] = React.useState('');
  const [reviewScore, setReviewScore] = React.useState('');

  React.useEffect(() => {
    props.handleRender();
  }, [status]);

  const handleAccept = () => {
    let body = {
      service_request_id: sr_id, 
      status: status, 
      button_status: "accept"
    }
    updateStatus(body);
    setCurrentStatus();
    // props.handleRender();
    window.location.reload(false);
  }


  const handleDecline = () => {
    let body = {
      service_request_id: sr_id, 
      status: status, 
      button_status: "decline"
    }
    updateStatus(body);
    setCurrentStatus();
    window.location.reload(false);
  }

  const handleCompleted = () => {
    let body = {
      service_request_id: sr_id, 
      status: status
    }
    updateStatus(body);
    setCurrentStatus();
    window.location.reload(false);
  }

  const handleAddReview = () => {
    if (reviewScore === "" && reviewDesc === "") {
      alert("Please ensure that all fields are entered!")
    }
    let body = {
      service_request_id: sr_id, 
      status: status, 
      score: reviewScore, 
      review: reviewDesc
    }
    console.log("Review body is ", body);
    updateStatus(body);
    setCurrentStatus();
    window.location.reload(false);
  }

  const setCurrentStatus = () => {
    callApiGetCurrentStatus(sr_id)
    .then(res => {
      console.log("callApiGetCurrentStatus returned: ", res['results'])
      setStatus(res['results'][FIELDS.STATUS]);
    })
  }

  const updateStatus = (body) => {
    callApiUpdateStatus(body)
    .then(res => {
      console.log("callApiUpdateStatus returned: ", res['results'])
    })
  }
  
  const callApiUpdateStatus = async (obj) => {
    const url = serverURL + "/api/updateservicerequest";
    console.log(url + " Is working");
    console.log("Status is ", status);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  const callApiGetCurrentStatus = async (sr_id) => {
    const url = serverURL + "/api/getcurrentstatus";
    console.log(url + " Is working");
    console.log("Status is ", status);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "service_request_id": sr_id, 
        }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  if (status !== "declined") {
    return (
        <Paper style={{ width: 1000 }}>
            <Typography variant="h6">{request[FIELDS.LOCATION]}</Typography>
            <Typography variant="body1">{request[FIELDS.DESCRIPTION]}</Typography>
            <Typography variant="body1">{request[FIELDS.CONTACT_INFO]}</Typography>
            {props.custId === null ? 
            <ServInboxPage 
            status={status}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            handleCompleted={handleCompleted}
            score={request[FIELDS.REVIEW_SCORE]}
            desc={request[FIELDS.REVIEW_DESC]}
            /> : 
            <CustInboxPage 
            status={status}
            handleAddReview={handleAddReview}
            setReviewScore={setReviewScore}
            setReviewDesc={setReviewDesc}
            score={reviewScore}
            /> }
        </ Paper>
      )
  }
  
}