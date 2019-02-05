import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
	root: {
		width: "100%",
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const data = [
	createData("March 23, 2018", 159, 6.0, 24, 4.0),
	createData("April 23, 2018", 237, 9.0, 37, 4.3),
	createData("May 23, 2018", 262, 16.0, 24, 6.0),
	createData("June 23, 2018", 305, 3.7, 67, 4.3),
	createData("July 23, 2018", 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
	const { classes } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Date Entered</TableCell>
						<TableCell numeric>Weight (lbs)</TableCell>
						<TableCell numeric>Length (in)</TableCell>
						<TableCell numeric>Age (in Months)</TableCell>
						<TableCell numeric>
							Percentile (weight-length)
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.data.map((n, i) => {
						return (
							<TableRow key={i}>
								<TableCell component="th" scope="row">
									{n.dateEntered}
								</TableCell>
								<TableCell numeric>{n.weightPounds}</TableCell>
								<TableCell numeric>{n.lengthInches}</TableCell>
								<TableCell numeric>{n.ageEntered}</TableCell>
								<TableCell numeric>{n.percentile}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
