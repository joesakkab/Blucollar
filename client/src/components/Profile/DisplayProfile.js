import React from 'react';
import {Card, CardActionArea, Typography, CardContent } from '@material-ui/core';
import useStyles from './Styles';
import * as FIELDS from '../../constants/serviceProviderConst';


export default function DisplayProfile(props) {

    let profile = props.profileData;
    let certs = props.certData;
    console.log(profile);
    console.log(certs);
    const classes = useStyles();
    return (
        <>
            {profile.map((obj) => {
                return (
                    <div className={classes.listing}>
                        <Card style={{ width: 1000 }}>
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
                    </div>
                )
            })}
            <Typography variant="h6">Certifications:</Typography>
            {certs.map((obj) => {
                return (
                    <div className={classes.listing}>
                        <Card style={{ width: 1000 }}>
                            <CardContent>
                                <Typography id="serviceType" variant="h6" className={classes.test2}>
                                  {obj[FIELDS.CERTIFICATION] !== null ? obj[FIELDS.CERTIFICATION] : "No certifications for this service provider."}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
        </>
        
    )
    
    
}