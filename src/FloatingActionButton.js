import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "./App";

const styles = theme => ({
	button: {
		margin: 10,
		position: "absolute",
		bottom: 0,
		right: 0,
	},
});

class FloatingActionButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
		};
	}

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes, addMeasurement } = this.props;
		const { anchorEl } = this.state;

		return (
			<div>
				<Button
					variant="fab"
					color="primary"
					aria-label="Add"
					aria-owns={anchorEl ? "simple-menu" : undefined}
					aria-haspopup="true"
					className={classes.button}
					onClick={addMeasurement}>
					<AddIcon />
				</Button>
			</div>
		);
	}
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
