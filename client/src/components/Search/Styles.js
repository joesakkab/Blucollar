
import { makeStyles, TextareaAutosize } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { light } from "@material-ui/core/styles/createPalette";
import defaultTheme from './theme';


export default makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans, sans-serif', // Set the font family to DM Sans
      },
      test: {
        padding: theme.spacing(5),
        // display: 'flex', 
        // marginTop: theme.spacing(2), 
        // borderRadius: 50
      },
      title: {
        marginBottom: theme.spacing(2),
        // color: '#fff',
        textAlign: 'center',
      },
      description: {
        marginBottom: theme.spacing(4),
        // color: '#fff',
        textAlign: 'center',
        maxWidth: 600,
        margin: '0 auto',
      },
      paper: {
        padding: theme.spacing(3),
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        // backgroundColor: 'transparent', // Set the background color of the paper to transparent
      },
      button: {
        width: '10%',
        margin: theme.spacing(1),
        backgroundColor: defaultTheme.palette.primary.main,
        color: defaultTheme.palette.primary.contrastText,
        borderRadius:defaultTheme.spacing(5),
        "&:hover": {
            backgroundColor: defaultTheme.palette.primary.light,
            color: defaultTheme.palette.primary.contrastText
        },
        "&:active": {
            backgroundColor: defaultTheme.palette.primary.contrastText,
            color: defaultTheme.palette.primary.light
        }
      },
      acceptButton: {
        width: '10%',
        margin: theme.spacing(1),
        backgroundColor: defaultTheme.palette.accept.main,
        color: defaultTheme.palette.accept.contrastText,
        borderRadius:defaultTheme.spacing(5),
        "&:hover": {
          backgroundColor: defaultTheme.palette.accept.light,
          color: defaultTheme.palette.accept.contrastText
      },
      "&:active": {
          backgroundColor: defaultTheme.palette.accept.contrastText,
          color: defaultTheme.palette.accept.light
      }
      },
      declineButton: {
        width: '10%',
        margin: theme.spacing(1),
        backgroundColor: defaultTheme.palette.decline.main,
        color: defaultTheme.palette.decline.contrastText,
        borderRadius:defaultTheme.spacing(5),
        "&:hover": {
          backgroundColor: defaultTheme.palette.decline.light,
          color: defaultTheme.palette.decline.contrastText
      },
      "&:active": {
          backgroundColor: defaultTheme.palette.decline.contrastText,
          color: defaultTheme.palette.decline.light
      }
      },

      searchBar: {
        color: 'white',
        alignContent: 'center',
        '& .MuiInputBase-root': {
            '& fieldset': {
                borderColor: defaultTheme.palette.secondary.light,
                borderRadius: defaultTheme.spacing(5),
                height: defaultTheme.spacing(7),
            },
            '&:hover fieldset': {
                borderColor: defaultTheme.palette.secondary.main,
            },
            '&.Mui-focused fieldset': {
                border: `2 px solid`,
                borderColor: defaultTheme.palette.secondary.main,
            },
        },
    },
      searchArea: {
        margin: defaultTheme.spacing(5),
        spacing: defaultTheme.spacing(2)
      },

      listing: {
        padding: theme.spacing(1),
      },
      card: {
        color: theme.palette.primary.main
      }
  }));