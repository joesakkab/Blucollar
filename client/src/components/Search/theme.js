import { createTheme } from "@material-ui/core";


export default createTheme({
    spacing: 8,
    palette: {
        primary: {
          light: '#4dabf5',
          main: '#2196f3',
          dark: '#1769aa',
          contrastText: '#fff',
        },
        secondary: {
          light: '#6c819c',
          main: '#486284',
          dark: '#32445c',
          contrastText: '#fff',
        },
        accept: {
          light: '#357a38',
          main: '#4caf50',
          dark: '#6fbf73',
          contrastText: '#fff',
        },
        decline: {
          light: '#f73378',
          main: '#f50057',
          dark: '#ab003c',
          contrastText: '#fff',
        }
    },

})