/*
 * File: /Users/lisazhang/Desktop/childhood-obesity/src/DashboardTabs.js
 * Project: /Users/lisazhang/Desktop/childhood-obesity
 * Created Date: Sunday December 16th 2018
 * Author: Lisa Zhang
 * -----
 * Last Modified: Friday January 18th 2019 10:32:08 am
 * Modified By: Lisa Zhang at <lisazhang@email.arizona.edu>
 * -----
 * Copyright (c) 2018 College of Public Health
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SimpleTable from "./SimpleTable";
import { Typography } from "@material-ui/core";
import moment from "moment";
import {
	ResponsiveContainer,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ComposedChart,
} from "recharts";

const styles = {
	root: {
		flexGrow: 1,
	},
};

class CenteredTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			data: this.props.data,
		};
	}

	handleChange = (event, value) => {
		console.log(value);
		this.setState({ value });
	};

	render() {
		const { classes, age: birthdate } = this.props;
		const { value, data } = this.state;
		const standardPercentiles = [
			[10, "red"],
			[25, "#82ca9d"],
			[50, "#B0B0B0"],
			[75, "#ffc658"],
			[85, "red"],
		];
		window.moment = moment;
		return (
			<Paper className={classes.root}>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered>
					<Tab label="Weight Chart" />
					<Tab label="Milestones" />
				</Tabs>
				{value === 0 && (
					<Typography component="div" style={{ padding: 8 * 3 }}>
						<ResponsiveContainer width="99%" height={320}>
							<ComposedChart data={data}>
								<CartesianGrid
									stroke="#ccc"
									strokeDasharray="5 5"
								/>

								{standardPercentiles.map((s, i) => (
									<Line
										key={i}
										activeDot={false}
										name={`${s[0]}th Percentile`}
										type="monotone"
										unit="kg"
										dataKey={s[0]}
										stackId="1"
										// fill={s[1]}
										stroke={s[1]}
									/>
								))}
								<Line
									name="Weight"
									unit="kg"
									type="monotone"
									dataKey="weight"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
								/>
								<XAxis dataKey="age" />
								<YAxis
									dataKey="weight"
									domain={[0, "dataMax"]}
									unit="kg"
								/>
								<Tooltip />
								<Legend />
							</ComposedChart>
						</ResponsiveContainer>
					</Typography>
				)}
				{value === 1 && (
					<Typography component="div" style={{ padding: 8 * 3 }}>
						<SimpleTable />
					</Typography>
				)}
			</Paper>
		);
	}
}

CenteredTabs.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
