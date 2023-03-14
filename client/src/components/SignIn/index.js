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
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const login = (submitUser) => {
    console.log(submitUser);
    callApiLogin(submitUser).then(res => {
      console.log("callApiLogin returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiLogin parsed: ", parsed);
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
      body: JSON.stringify(Object)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  const handleCheckboxChange = (event) => {
    setShowAdditionalInfo(event.target.checked);
  };


  const handleSubmit1 = () => {
    if(email !== "" && password !== "") {
      let submitUser = {
        email: email,
        password: password,
        isServiceProvider: showAdditionalInfo
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
          <FormControlLabel
            control={
              <Checkbox
                checked = {showAdditionalInfo}
                onChange = {handleCheckboxChange}
                name="showAdditionalInfo"
                color="primary"
              />
            }
            label="I am a Service Provider"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick = {handleSubmit1}
          >
            SignIn
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignIn;
