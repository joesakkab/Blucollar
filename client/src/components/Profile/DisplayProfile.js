import React from 'react';
import {Card, CardActionArea, Typography, CardContent } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from './Styles';
import history from '../Navigation/history';
import * as FIELDS from '../../constants/routes';


export default function DisplayProfile(props) {

    let data = props.data;
    console.log(data);
    const classes = useStyles();
    return (
        <>
            {data.map((obj) => {
                return (
                    <div className={classes.listing}>
                        <Card style={{ width: 1000 }}>
                            <CardContent>
                                <Typography id="title" variant="h4" className={classes.test2}>
                                {obj["FirstName"] + " " + obj["LastName"] + " - " + obj[""]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
        </>
        
    )
    
    
}