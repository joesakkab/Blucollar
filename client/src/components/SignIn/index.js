import React, { Fragment, useState, useSyncExternalStore } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import history from '../Navigation/history';
import * as ROUTES from '../../constants/routes';
import Cookies from 'js-cookies';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#2196f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "DM Sans, sans-serif",
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
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  button: {
    width: "100%",
    margin: theme.spacing(1),
    backgroundColor: "#2196f3",
    color: "#fff",
  },
}));

function SignIn() {
  const classes = useStyles();
  const serverURL = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (submitUser) => {
    console.log(submitUser);
    callApiLogin(submitUser).then(res => {
      console.log("callApiLogin returned: ", res)
    })
  }

  const callApiLogin= async (userObject) => {
    const url = serverURL + "/api/login";
    console.log(url);
    console.log(JSON.stringify(userObject))

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject)
    });
    const body = await response.json();
    if (response.status !== 200) {
      // setStatus(response.status);
      alert(body.error)
    } else {
      Cookies.setItem("token", body.token)
      console.log("Cookie of token is", Cookies.getItem("token"))
      history.push(ROUTES.SEARCH);
    }
    console.log(" success : ", body);
    return body;
    
  }


  const handleSubmit1 = () => {
    if(email !== "" && password !== "") {
      let submitUser = {
        email: email,
        password: password
      }
      login(submitUser);

    } else {
      alert("Please ensure that all fields are entered!")
    }
  }


  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Sign In
      </Typography>
      <Paper elevation={5} className={classes.paper}>
        <form noValidate autoComplete="off">
            
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={email}
            onChange={(email) => setEmail(email.target.value)}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(password) => setPassword(password.target.value)}
            inputProps={{ maxLength: 30 }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick = {handleSubmit1}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignIn;
