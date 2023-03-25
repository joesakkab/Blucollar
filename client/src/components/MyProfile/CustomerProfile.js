import React from 'react';
import { TextField, Grid, Card, CardContent, Typography, Button, } from '@material-ui/core';
import useStyles from '../Profile/Styles';
import * as FIELDS from '../../constants/customerConst';

export default function CustomerProviderProfile(props) {

    const obj = props.profileData;
    const id = obj['cust_id']
    console.log(id)

    const handleEdit = () => {
        
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
                            value = {obj[FIELDS.FIRST]}
                            />
                            <TextField 
                            label="Last Name" 
                            className={classes.test2}
                            value = {obj[FIELDS.LAST]}
                            />
                            <TextField 
                            label="Email" 
                            className={classes.test2}
                            value = {obj[FIELDS.EMAIL]}
                            />
                            <TextField 
                            label="Location" 
                            className={classes.test2} 
                            value = {obj[FIELDS.LOCATION]}
                            />
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                </div>
            
            <Grid sx={classes.paper}>
              <Button
              type='submit'
              onClick={handleEdit}>
              Edit Profile
              </Button>
            </Grid>
                       
               
        </form>
        
    )
}