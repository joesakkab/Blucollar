import React from "react";
import {Button, Modal, Box, Typography, MuiThemeProvider, TextField, makeStyles} from "@material-ui/core";
import theme from '../Search/theme';
import Cookies from "js-cookies";
import * as ROUTES from '../../constants/routes';
// import * as FIELDS from '../../constants/serviceRequestConst';

export default function ServiceRequest(props) {

    const serverURL = ""
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const classes = makeStyles(theme)

      const submitReq = (reqObj) => {
        console.log(reqObj);
        callServiceRequestInitApi(reqObj).then(res => {
          console.log("callServiceRequestInitApi returned: ", res)
        })
      }
    
      const callServiceRequestInitApi = async (reqObj) => {
        const url = serverURL + "/api/initservicerequest";
        console.log(url);
        console.log(JSON.stringify(reqObj))
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + Cookies.getItem('token')
          },
          body: JSON.stringify(reqObj), 
          auth: {"token": Cookies.getItem('token')},
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(" success : ", body);
        return body;
      }

    const handleSubmitRequest = () => {
      if(description !== "" && location !== "") {
        let data = props.profileData[0]
        console.log(data)
        let id = data['Service_ProviderID']
        let serviceType = data['ServiceType']
        console.log("Profile object is ", props.profileData)
        console.log(Cookies.getItem('token'))
        let request = {
            location: location,
            desc: description,
            type: serviceType,
            sp_id: id,
            contact_info: contact
        }
        submitReq(request);

      } else {
        alert("Please ensure that all fields are entered!")
      }
    }

	const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [contact, setContact] = React.useState('');
    // const [request, setRequest] = React.useState([]);

	return (
        <>
            <MuiThemeProvider theme={theme}>
            <Button onClick={handleOpen}>Create service request</Button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                <form noValidate autoComplete="off">
                    <TextField
                    label="location"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    value={location}
                    onChange={(location) => setLocation(location.target.value)}
                    inputProps={{ maxLength: 30 }}
                    />
                    <TextField
                    label="description"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={description}
                    onChange={(description) => setDescription(description.target.value)}
                    inputProps={{ maxLength: 200 }}
                    />
                    <TextField
                    label="Contact Info"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={contact}
                    onChange={(contact) => setContact(contact.target.value)}
                    inputProps={{ maxLength: 200 }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {handleSubmitRequest}
                    >
                    Submit
                    </Button>
                </form>
                </Box>
                </Modal>
            </MuiThemeProvider>
        </>
	)
}