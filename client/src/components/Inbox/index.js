import React from 'react';
import theme from "../Search/theme";
import {MuiThemeProvider} from "@material-ui/core";
import NavigationBar from "../NavigationBar";


export default function Inbox() {
	return (
		<MuiThemeProvider theme={theme}>
			<NavigationBar />
		</MuiThemeProvider>
	)

}