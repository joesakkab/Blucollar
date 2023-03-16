import React from 'react';
import {Card, CardActionArea, Typography, CardContent } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from './Styles';
import history from '../Navigation/history';
import * as ROUTES from '../../constants/routes';
import * as FIELDS from '../../constants/serviceProviderConst';


export default function DisplaySearch(props) {

    // let objs = props.data;
    // let id = props.id;
    let allObjs = props.data;
    console.log(allObjs);
    const classes = useStyles();
    return (
        <>
            {allObjs.map( (obj) => {
                return (
                    <div className={classes.listing}>
                        <Card style={{ width: 1000 }}>
                            <CardActionArea onClick={() => history.push(ROUTES.PROFILE + "/" + obj[FIELDS.ID])}>
                            <CardContent>
                                <Typography id="title" variant="h4" className={classes.test2}>
                                {obj[FIELDS.FIRST] + " " + obj[FIELDS.LAST] + " - " + obj[FIELDS.SERVICETYPE]}
                                </Typography>
                                <Typography id="description">
                                {obj[FIELDS.DESCRIPTION]}
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} id="location">
                                {obj[FIELDS.LOCATION]}
                                </Typography>
                                <Rating name="half-rating-read" defaultValue={obj[FIELDS.RATING]} precision={0.1} readOnly />
                                <Typography>
                                {obj[FIELDS.RATING] + " / 5.0"}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                )
            })}
        </>
        
    )
    
    
}