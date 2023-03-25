import React, { useState } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Button, } from '@material-ui/core';
import useStyles from '../Profile/Styles';
import * as FIELDS from '../../constants/customerConst';

export default function CustomerProviderProfile(props) {

    const obj = props.profileData;
    const id = obj['cust_id']
    const [fName, setFName] = useState(obj[FIELDS.FIRST]);
    const [LName, setLName] = useState(obj[FIELDS.LAST]);
    const [email, setEmail] = useState(obj[FIELDS.EMAIL]);
    const [location, setLocation] = useState(obj[FIELDS.LOCATION]);
    const [readOnlyState, setReadOnlyState] = useState(true);

    const handleEdit = () => {
      setReadOnlyState(false);
    }

    const handleCancel = () => {
      setReadOnlyState(true);
    }

    const handleConfirmEdits = () => {
      // open a dialog to confirm the changes made
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
                onClick={handleConfirmEdits}
                > Confirm Edits
                </Button>
              
              </Grid>
            }
          </Grid>
          </div>
        </form>
        
    )
}