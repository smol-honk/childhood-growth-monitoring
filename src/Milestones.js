/*
 * File: /Users/lisazhang/Desktop/childhood-obesity/src/Milestones.js
 * Project: /Users/lisazhang/Desktop/childhood-obesity
 * Created Date: Friday January 25th 2019
 * Author: Lisa Zhang
 * -----
 * Last Modified: Friday January 25th 2019 12:06:49 pm
 * Modified By: Lisa Zhang at <lisazhang@email.arizona.edu>
 * -----
 * Copyright (c) 2019 College of Public Health
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
});

function Milestones(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>
						Expansion Panel 1
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>
						Expansion Panel 2
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default withStyles(styles)(Milestones);
