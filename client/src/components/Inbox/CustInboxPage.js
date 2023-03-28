import React from "react";
import useStyles from '../Search/Styles';
import { Typography, Modal, TextField, Button, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../Search/theme';


function CustInboxPage(props) {

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const status = props.status;
  console.log(status)



  if (props.status == 'start') {
    return (
      <div>
        <Typography>
          <b>Wait for service provider to accept service.</b>
        </Typography>
      </div>
    )
  } else if ( props.status == "accepted") {
    return (
      <div>
      <Typography>
        <b>Waiting for provider to complete the job.</b>
      </Typography>
    </div>
  
    );
  } else if (props.status == "review") {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Button variant='contained' classeName={classes.button} onClick={handleOpen}>Add Review</Button>
          <Modal
              open={open}
              onClose={handleClose}
          >
              <form noValidate autoComplete="off">
                  <Box sx={style}>
                      <Typography>Write a review!</Typography>
                      <TextField 
                      id="review-body" 
                      placeholder='Write your review here ...'
                      type="text"
                      multiline
                      rows={2}
                      onChange={(desc) => props.setReviewDesc(desc.target.value)}> </TextField>
                      <div>
                          <Rating 
                          name="no-value" 
                          value={props.score} 
                          // onChange={(score) => props.setReviewScore(score.target.value)}
                          onChange={(event, score) => {props.setReviewScore(score); }}
                          />
                      </div>
                      <Button
                      type='submit'
                      id='submit-review'
                      onClick = {props.handleAddReview}>
                          Submit Review
                      </Button>
                  </Box>
              </form>
              
          </Modal>
          </MuiThemeProvider>
      </div>
    )
  }
  else if (props.status == "completed") {
    return (
      <div>
        <Typography>
          Thank you for your review!
        </Typography>
      </div>
    )
  } else {
    return (
      <div></div>
    );
  }
  
}
export default CustInboxPage;
