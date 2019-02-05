import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Login from "./Login";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dashboard from "./Dashboard";
import FloatingActionButton from "./FloatingActionButton";
// import firebase from "firebase";
import AddEntry from "./AddEntry";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// text colors: #7D7C7A
// dusty purple: #9d8ca1
// old purple: #b39ddb

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#558b2f",
		},
		secondary: {
			main: "#9d8ca1",
		},
	},
});

export function logout() {
	// firebase
	// 	.auth()
	// 	.signOut()
	// 	.then(function() {
	// 		// Sign-out successful.
	// 		console.log("Sign Out Successful");
	// 	})
	// 	.catch(function(error) {
	// 		// An error happened.
	// 	});
	console.log("logout");
}
class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { user: null };
	// }
	// componentDidMount() {
	// 	firebase.auth().onAuthStateChanged(user => {
	// 		if (user) {
	// 			console.log(user);
	// 			this.setState({ user });
	// 			// User is signed in.
	// 		} else {
	// 			// No user is signed in.
	// 			this.setState({ user: null });
	// 		}
	// 	});
	// }
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Login />

				{/* <Dashboard /> */}
			</MuiThemeProvider>
		);
	}
}

export default App;
