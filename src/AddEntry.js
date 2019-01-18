import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FloatingActionButton from "./FloatingActionButton";
import moment from "moment";
import { calculatePercentile, getPercentileWeights } from "./wtrlinf";
// import firebase from "firebase";

export default class AddEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: this.props.initState,
			weight: "",
			length: "",
		};
		// this.user = firebase.auth().currentUser;
	}

	handleDialogOpen = () => {
		this.setState({ open: true });
	};

	handleDialogClose = () => {
		this.setState({ open: false });
	};

	addMeasurementSubmit = () => {
		const { weight, length } = this.state;
		const { sex, birthdate } = this.props;
		const percentile =
			calculatePercentile(sex, weight, length).toFixed(2) || "N/A";
		const dateEntered = moment.utc().format("MM-DD-YYYY");
		const ageEntered = moment
			.duration(moment().diff(moment(birthdate)))
			.as("months")
			.toFixed(2);
		const age = `${ageEntered} Months Old`;
		const {
			L,
			M,
			S,
			Sex,
			Length,
			...stdPercentiles
		} = getPercentileWeights(sex, length);
		const percentileWeights = Object.entries(stdPercentiles).reduce(
			(acc, curr, index) => {
				console.log(index);
				let percentileKey = curr[0].replace("P", "");
				return { ...acc, [percentileKey]: curr[1].toFixed(2) };
			},
			{}
		);

		let entryData = {
			age,
			percentile,
			weight,
			length,
			dateEntered,
			ageEntered,
		};

		this.props.saveEntry({
			...percentileWeights,
			...entryData,
		});
		this.handleDialogClose();
	};

	addMeasurement = () => {
		console.log("Add Measurement");
		this.handleDialogOpen();
	};

	render() {
		return (
			<div style={{ zIndex: 1 }}>
				<FloatingActionButton
					addChild={this.addChild}
					addMeasurement={this.addMeasurement}
				/>
				<Dialog
					open={this.state.open}
					onClose={this.handleDialogClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Add Measurement
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Enter you child's information to track their growth
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="weight"
							label="Child's Weight in kg"
							type="number"
							onChange={e =>
								this.setState({ weight: e.target.value })
							}
							fullWidth
						/>
						<TextField
							id="length"
							label="Child's Length in cm"
							type="number"
							defaultValue="2018-05-24"
							onChange={e =>
								this.setState({ length: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.handleDialogClose}
							color="primary">
							Cancel
						</Button>
						<Button
							onClick={this.addMeasurementSubmit}
							color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
