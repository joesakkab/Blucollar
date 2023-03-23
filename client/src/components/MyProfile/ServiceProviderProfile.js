import React, {useState, useEffect} from 'react';
import { TextField, Grid, Card, CardContent, Typography, FormControl, Button, } from '@material-ui/core';
import useStyles from '../Profile/Styles';
import * as FIELDS from '../../constants/serviceProviderConst';

export default function ServiceProviderProfile(props) {

    const obj = props.profileData;
    const id = obj['Service_ProviderID']
    console.log(id)
    let serverURL = '';
    const [certs, setCerts] = React.useState([]);

    const callApiCerts = async (given_id) => {
        const url = serverURL + "/api/getcerts";
        console.log(url)
        const profileID = JSON.stringify({"id": Number(given_id)})

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: profileID,
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(" success : ", body);
        return body;
      }
    
    useEffect(() => {
        getCertData(id)
    }, []);

    let getCertData = (given_id) => {
        callApiCerts(given_id)
        .then(res => {
            console.log("callApiCerts certification data returned: ", res)
            setCerts(res["results"])
        })
    }

    const handleEdit = () => {
        
    }
    
    const classes = useStyles();
    return (
        <form>
                <div className={classes.listing}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
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
                            label="Service Type" 
                            className={classes.test2}
                            value = {"Service Type: " + obj[FIELDS.SERVICETYPE][0].toUpperCase() + obj[FIELDS.SERVICETYPE].slice(1)}
                            />
                            <TextField 
                            label="Description" 
                            className={classes.test2} 
                            value = {obj[FIELDS.DESCRIPTION]}
                            />
                            <TextField 
                            label="Location" 
                            className={classes.test2} 
                            value = {obj[FIELDS.LOCATION]}
                            />
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography 
                            variant = "h6"
                            className={classes.bold}
                            >
                                Established:
                            </Typography>
                            <TextField 
                            className={classes.test2}
                            value = {obj[FIELDS.EXPERIENCE]}
                            />
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                </div>
            <Grid container spacing={4}>
              <Grid item xs={12}><Typography variant="h6">Certifications:</Typography></Grid>
            </Grid>
            {certs.map((obj) => {
                return (
                    <div className={classes.listing}>
                      <Grid container spacing={4}>
                        <Grid item xs={8}>
                        <Card>
                            <CardContent>
                                <TextField 
                                label="Certifications" 
                                className={classes.test2} 
                                value = {obj[FIELDS.CERTIFICATION] !== null ? obj[FIELDS.CERTIFICATION] : "No certifications for this service provider."}
                                />
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={3}>
                          
                        </Grid>
                      </Grid>

                      <Grid sx={classes.paper}>
                        <Button
                        type='submit'
                        onClick={handleEdit}>
                        Edit Profile
                        </Button>
                    </Grid>
                       
                    </div>
                )
            })}
        </form>
        
    )
}