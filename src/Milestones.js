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
import { fineMotor, grossMotor, social, verbal } from "./wtrlinf";

const styles = (theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
});

window.fineMotor = fineMotor;
window.grossMotor = grossMotor;
window.social = social;
window.verbal = verbal;
function Milestones(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Typography variant="h2" gutterBottom>
				Fine Motor Skills
      </Typography>
			{fineMotor.map((m, i) =>
				<ExpansionPanel key={i}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>
							{m['Range']}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							{m['Fine Motor']}
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>)
			}
			<Typography variant="h2" gutterBottom>
				Gross Motor Skills
      </Typography>
			<Typography variant="h2" gutterBottom>
				Social Language and Self-help
      </Typography>
			<Typography variant="h2" gutterBottom>
				Verbal Language (Expressive and Receptive)      </Typography>
		</div>
	);
}

export default withStyles(styles)(Milestones);
