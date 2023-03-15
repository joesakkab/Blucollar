import React from 'react';
import useStyles from './Styles';

import {TextField, Button, FormControl} from '@material-ui/core';



export default function Search(props) {

    const serverURL = props.serverURL;
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        Search(props.searchTerm)
    }

    const handleSearchInputChange = (event) => {
        props.handleSearchSubmit(event.target.value);
    }

    const callApiSearch = async (searchTerm) => {
        const url = serverURL + '/api/searchbyservice';
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ serviceType: searchTerm })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(" success : ", body);
        return body;

    }

    const Search = (searchTerm) => {
        callApiSearch(searchTerm)
            .then(res => {
                console.log("callApiSearch returned: ", res.results)
                props.setServiceProviders(res.results)
                }
            )
    }

    const classes = useStyles();
    return (
        <div className={classes.searchArea}>
            <FormControl>
                <TextField
                    className={classes.searchBar}
                    onChange={handleSearchInputChange}
                    style={{ width: 1000 }}
                    placeholder="Search for a service ..."
                    variant="outlined"
                    id="search"
                />

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    className={classes.button}
                    onClick={handleSearchSubmit}
                >
                    Search
                </Button>
            </FormControl>
        </div>
    )
}