import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import useStyles from '../Profile/Styles';
import * as FIELDS from '../../constants/customerConst';

export default function CustomerProviderProfile(props) {

    const obj = props.profileData;
    const id = props.id;

    const [fName, setFName] = useState(obj[0][FIELDS.FIRST]);
    const [LName, setLName] = useState(obj[0][FIELDS.LAST]);
    const [email, setEmail] = useState(obj[0][FIELDS.EMAIL]);
    const [location, setLocation] = useState(obj[0][FIELDS.LOCATION]);
    const [readOnlyState, setReadOnlyState] = useState(true);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const handleEdit = () => {
      setReadOnlyState(false);
    }

    const handleCancel = () => {
      setReadOnlyState(true);
    }

    const handleConfirmDialog = () => {
      setOpenConfirmDialog(true);
    }

    const handleDialogClose = () => {
      setOpenConfirmDialog(false);
    }

    const modifyProfile = (editUser) => {
      callApiEditUser(editUser)
      setReadOnlyState(true)
      // either update the jwt token with the new information or use a backend api call to get profile data
    }
  
    const callApiEditUser = async (userObject) => {
      const serverURL = ""
      const url = serverURL + "/api/edituserprofile";
      console.log(url);
      console.log(JSON.stringify(userObject))
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject)
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(" success : ", body);
      return body;
    }

    const handleSubmit = () => {
      setOpenConfirmDialog(false);
      if(fName !== "" && LName !== "" && email !== "" && location !== "") {
        let editUser = {
          'id': id,
          'firstName': fName,
          'lastName': LName,
          'email': email,
          'location': location,
        }
        console.log(editUser)
        modifyProfile(editUser)
        // history.push(ROUTES.SEARCH);
      } else {
        alert("Please ensure that all fields are entered!")
      }
    }
    
    const classes = useStyles();
    return (
        <form>
          <div className={classes.listing}>
          <Grid container spacing={1}>
              <Grid item xs={12}><Typography variant="h6">Your Profile Details:</Typography></Grid>
              <Grid item xs={12}>
              <Card>
                  <CardContent>
                      <TextField
                      label="First Name" 
                      className={classes.test2} 
                      value={fName}
                      onChange={(fName) => setFName(fName.target.value)}
                      inputProps={{ 
                        maxLength: 30,
                        readOnly: readOnlyState }}
                      />
                      <TextField 
                      label="Last Name" 
                      className={classes.test2}
                      value={LName}
                      onChange={(LName) => setLName(LName.target.value)}
                      inputProps={{ 
                        maxLength: 30,
                        readOnly: readOnlyState }}
                      />
                      <TextField 
                      label="Email"
                      className={classes.test2}
                      value={email}
                      onChange={(email) => setEmail(email.target.value)}
                      inputProps={{ 
                        maxLength: 30,
                        readOnly: readOnlyState }}
                      />
                      <TextField 
                      label="Location" 
                      className={classes.test2} 
                      value={location}
                      onChange={(location) => setLocation(location.target.value)}
                      inputProps={{ 
                        maxLength: 30,
                        readOnly: readOnlyState }}
                      />
                  </CardContent>
              </Card>
              </Grid>
          </Grid>
          </div>
            
          <div className={classes.listing}>
          <Grid container spacing={1} sx={classes.paper}>
              <Grid item xs={12}>
                <Button
                disabled={!readOnlyState}
                type='button'
                onClick={handleEdit}>
                {readOnlyState ? 'Edit Profile' : 'Editing Profile'}
                </Button>
              </Grid>
              {readOnlyState ? '' : 
              <Grid item xs={12}>
                <Button
                  type='button'
                  color='secondary'
                  onClick={handleCancel}
                  > Cancel Changes
                </Button>

                <Button
                type='button'
                color='primary'
                onClick={handleConfirmDialog}
                > Confirm Edits
                </Button>
              
              </Grid>
            }
          </Grid>
          </div>

          <Dialog
            open={openConfirmDialog}
            onClose={handleDialogClose}
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you would like to edit your profile?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Editing your profile cannot be undone, please verify your changes are correct before confirming.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={handleDialogClose}>Cancel</Button>
              <Button color='primary' onClick={handleSubmit} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
                       
        </form>
        
    )
}