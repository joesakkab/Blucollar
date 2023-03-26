import React from 'react';
import {Card, Typography, CardContent, Grid } from '@material-ui/core';
import useStyles from './Styles';
import * as FIELDS from '../../constants/serviceProviderConst';


export default function DisplayProfile(props) {

    let profile = props.profileData;
    let certs = props.certData;
    const classes = useStyles();
    return (
        <>
            {profile.map((obj) => {
                return (
                    <div className={classes.listing}>
                    <Grid container spacing={4}>
                      <Grid item xs={8}>
                        <Card>
                            <CardContent>
                                <Typography id="name" variant="h4" className={classes.test2}>
                                  {obj[FIELDS.FIRST] + " " + obj[FIELDS.LAST]}
                                </Typography>
                                <Typography id="serviceType" variant="h6" className={classes.test2}>
                                  {"Service Type: " + obj[FIELDS.SERVICETYPE][0].toUpperCase() + obj[FIELDS.SERVICETYPE].slice(1)}
                                </Typography>
                                <Typography id="description" className={classes.test2}>
                                  {obj[FIELDS.DESCRIPTION]}
                                </Typography>
                                <Typography id="location" className={classes.test2}>
                                  {"Location: " + obj[FIELDS.LOCATION]}
                                </Typography>
                            </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.bold}>
                                  {"Established:"}
                                </Typography>
                                <Typography className={classes.test2}>
                                  {obj[FIELDS.EXPERIENCE]}
                                </Typography>
                            </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    </div>
                )
            })}
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
                                <Typography id="serviceType" variant="h6" className={classes.test2}>
                                  {obj[FIELDS.CERTIFICATION] !== null ? obj[FIELDS.CERTIFICATION] : "No certifications for this service provider."}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={3}>
                          
                        </Grid>
                      </Grid>
                       
                    </div>
                )
            })}
        </>
        
    )
    
    
}