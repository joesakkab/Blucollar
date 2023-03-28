import React from 'react';
import { Typography, Modal, TextField, Button, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../Search/theme';
import useStyles from '../Search/Styles';


// const useStyles = makeStyles((theme) => ({
//     root: {
//       height: "100vh",
//       backgroundColor: "#2196f3",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       fontFamily: "DM Sans, sans-serif", // Set the font family to DM Sans
//     },
//     title: {
//       marginBottom: theme.spacing(2),
//       color: "#fff",
//       textAlign: "center",
//     },
//     description: {
//       marginBottom: theme.spacing(4),
//       color: "#fff",
//       textAlign: "center",
//       maxWidth: 600,
//       margin: "0 auto",
//     },
//     paper: {
//       padding: theme.spacing(3),
//       maxWidth: 400,
//       width: "100%",
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between", // Add space between the text and the buttons
//       marginTop: theme.spacing(4),
//       // backgroundColor: 'transparent', // Set the background color of the paper to transparent
//     },
//     button: {
//       width: "60%", // Set the button width to 30% to allow space between them
//       margin: theme.spacing(1),
//       backgroundColor: "#2196f3", // Set the button background color to match the background color of the page
//       color: "#fff", // Set the button text color to white
//     },
//   }));


export default function Review(props) {

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

    // decalre initial states
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        
            <>
            <MuiThemeProvider theme={theme}>
                <Button variant='contained' classeName={classes.button} onClick={handleOpen}>View Review</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <form noValidate autoComplete="off">
                        <Box sx={style}>
                            <Typography><b>Review Details</b></Typography>
                            <Typography>{props.desc}</Typography>
                            <div>
                                <Rating 
                                name="display-value" 
                                value={props.score}
                                readOnly 
                                />
                            </div>
                        </Box>
                    </form>
                    
                </Modal>
                </MuiThemeProvider>
            </>
        
    )
}