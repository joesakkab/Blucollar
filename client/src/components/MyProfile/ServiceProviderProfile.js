import React, {useState, useEffect} from 'react';
import { TextField, Grid, Card, CardContent, CardActions, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Modal, Box } from '@material-ui/core';
import useStyles from '../Profile/Styles';
import * as FIELDS from '../../constants/serviceProviderConst';

export default function ServiceProviderProfile(props) {

    const modalStyle = {
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

    const obj = props.profileData;
    const id = props.id;

    const serverURL = "";
    const [readOnlyState, setReadOnlyState] = useState(true);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [updatedCert, setUpdatedCert] = useState("");
    const [openCertModal, setOpenCertModal] = useState(false);
    const [editedCerts, setEditedCerts] = useState(false);

    const [certs, setCerts] = useState([]);
    const [fName, setFName] = useState(obj[0][FIELDS.FIRST]);
    const [LName, setLName] = useState(obj[0][FIELDS.LAST]);
    const [email, setEmail] = useState(obj[0][FIELDS.EMAIL]);
    const [location, setLocation] = useState(obj[0][FIELDS.LOCATION]);
    const [serviceType, setServiceType] = useState(obj[0][FIELDS.SERVICETYPE]);
    const [description, setDescription] = useState(obj[0][FIELDS.DESCRIPTION]);
    const [experience, setExperience] = useState(obj[0][FIELDS.EXPERIENCE]);

    const handleEdit = () => {
      setReadOnlyState(false);
    }

    const handleCertDelete = (certID) => {
      let deleteDetails = {"cert_id": certID}
      callApiDeleteCert(deleteDetails)
      setEditedCerts(true)
      getCertData(id)
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
    
    const handleCertModalClose = () => {
      setOpenCertModal(false);
    }

    const modifyProfile = (editUser) => {
      callApiEditUser(editUser)
      setReadOnlyState(true)
      // either update the jwt token with the new information or use a backend api call to get profile data
    }

    const handleAddCert = () => {
      setOpenCertModal(true)
    }

    const handleConfirmAddCert = (updatedCert) => {
      let addCertDetails = {"cert_name": updatedCert, "service_provider_id": id}
      setEditedCerts(true)
      callApiAddCert(addCertDetails)
      setOpenCertModal(false)
      getCertData(id)
    }

    const callApiCerts = async (id) => {
        const url = serverURL + "/api/getcerts";
        console.log(id)
        const profileID = JSON.stringify({"id": Number(id)})
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
        if (certs.length === 0 || editedCerts) {
          getCertData(id)
          setEditedCerts(false)
        }
    }, [certs]);

    let getCertData = (id) => {
        callApiCerts(id)
        .then(res => {
            console.log("callApiCerts certification data returned: ", res)
            setCerts(res["results"])
        })
    }

    const callApiAddCert = async (userObject) => {
      const url = serverURL + "/api/addcert";
      console.log(url);
      console.log(JSON.stringify(userObject))
  
      const response = await fetch(url, {
        method: "POST",
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

    const callApiDeleteCert = async (userObject) => {
      const url = serverURL + "/api/deletecert";
      console.log(url);
      console.log(JSON.stringify(userObject))
  
      const response = await fetch(url, {
        method: "DELETE",
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

    const callApiEditUser = async (userObject) => {
      const url = serverURL + "/api/editproviderprofile";
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
          'description': description,
          'serviceType': serviceType,
          'experience': experience,
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
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            <TextField 
                            label="First Name" 
                            className={classes.test2} 
                            value = {fName}
                            onChange={(fName) => setFName(fName.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
                            />
                            <TextField 
                            label="Last Name" 
                            className={classes.test2}
                            value = {LName}
                            onChange={(LName) => setLName(LName.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
                            />
                            <TextField 
                            label="Email" 
                            className={classes.test2}
                            value = {email}
                            onChange={(email) => setEmail(email.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
                            />
                            <TextField 
                            label="Service Type" 
                            className={classes.test2}
                            value = {serviceType}
                            onChange={(serviceType) => setServiceType(serviceType.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
                            />
                            <TextField 
                            label="Established:" 
                            className={classes.test2} 
                            type="number"
                            value = {experience}
                            onChange={(experience) => setExperience(experience.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
                            />
                            <TextField 
                            label="Location" 
                            className={classes.test2}
                            value = {location}
                            onChange={(location) => setLocation(location.target.value)}
                            inputProps={{ 
                              maxLength: 45,
                              readOnly: readOnlyState }}
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
                                Description:
                            </Typography>
                            <TextField
                            multiline 
                            fullWidth
                            maxRows={5}
                            value = {description}
                            onChange={(description) => setDescription(description.target.value)}
                            inputProps={{ 
                              maxLength: 500,
                              readOnly: readOnlyState }}
                            />
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                </div>
            <div className={classes.listing}>
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
            <Grid container spacing={4}>
              <Grid item xs={12}><Typography variant="h6">Certifications:</Typography></Grid>
            </Grid>
            </div>
            {certs.map((obj) => {
                return (
                    <div key={obj[FIELDS.CERTIFICATION]} className={classes.listing}>
                      <Grid container spacing={4}>
                        <Grid item xs={8}>
                        <Card>
                          <CardContent>
                            <Typography id="serviceType" variant="h6" className={classes.test2}>
                              {obj[FIELDS.CERTIFICATION] !== null ? obj[FIELDS.CERTIFICATION] : "No certifications."}
                            </Typography>
                          </CardContent>
                          {obj[FIELDS.CERTIFICATION] !== null ?
                          <CardActions>
                            <Button 
                              size="small"
                              onClick={() => {handleCertDelete(obj[FIELDS.CERTID])}}>
                              Delete</Button>
                          </CardActions>
                              : ''} 
                        </Card>
                        </Grid>
                      </Grid>
                       
            </div>
                )
            })}
        <div className={classes.listing}>
        <Grid container spacing={1} sx={classes.paper}>
          <Grid item xs={12}>
            <Button
            disabled={!readOnlyState}
            type='button'
            onClick={handleAddCert}>
            Add Certification
            </Button>
          </Grid>
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

        <Modal
          open={openCertModal}
          onClose={handleCertModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={modalStyle}>
          <form noValidate autoComplete="off">
              <TextField
              label="Certification"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={updatedCert}
              onChange={(updatedCert) => setUpdatedCert(updatedCert.target.value)}
              inputProps={{ maxLength: 100 }}
              />
              <Button
              variant="contained"
              color="primary"
              onClick = {() => handleConfirmAddCert(updatedCert)}
              >
              Add Certification
              </Button>
          </form>
          </Box>
        </Modal>
        </form>
    )
}