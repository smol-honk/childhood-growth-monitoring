import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Dashboard from "./Dashboard";
import { DatePicker } from "material-ui-pickers";

import { Formik } from "formik";

const styles = (theme) => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
			3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = { childValues: null };
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	}
	render() {
		const { classes } = this.props;
		const { childValues } = this.state;
		if (childValues) {
			return <Dashboard childValues={childValues} />;
		}
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Measurements
					</Typography>
					<Formik
						enableReinitialize
						initialValues={{
							participantNumber: "",
							birthdate: new Date(),
							sex: "female",
						}}
						onSubmit={(values, actions) => {
							this.setState({ childValues: values });
						}}
						render={(props) => (
							<form
								onSubmit={props.handleSubmit}
								className={classes.form}>
								<TextField
									id="participant"
									label="Participant Number"
									placeholder="Participant Number"
									className={classes.textField}
									margin="normal"
									name="participantNumber"
									onChange={props.handleChange}
								/>
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<DatePicker
										name="birthdate"
										margin="normal"
										label="Date of Birth"
										className={classes.textField}
										value={props.values.birthdate}
										onChange={(date) => {
											console.log(date);
											console.log(props);
											props.setFieldValue(
												"birthdate",
												date.format("YYYY-MM-DD")
											);
										}}
									/>
								</MuiPickersUtilsProvider>
								<TextField
									id="sex"
									select
									label="Select Sex"
									className={classes.textField}
									value={props.values.sex}
									name="sex"
									onChange={props.handleChange}
									SelectProps={{
										MenuProps: {
											className: classes.menu,
										},
									}}
									helperText="Please select your child's sex"
									margin="normal">
									<MenuItem key={"female"} value={"female"}>
										Female
									</MenuItem>
									<MenuItem key={"male"} value={"male"}>
										Male
									</MenuItem>
								</TextField>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary">
									Submit
								</Button>
							</form>
						)}
					/>
				</Paper>
			</main>
		);
	}
}

SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);
