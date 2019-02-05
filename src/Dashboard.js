import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./wtrlinf";
import { milestones } from "./wtrlinf";
import AddEntry from "./AddEntry";
import { Paper, Grid, Tabs, Tab, SwipeableDrawer } from "@material-ui/core";
import SimpleTable from "./SimpleTable";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import Education from "./Education";
import Milestones from "./Milestones";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const drawerWidth = 400;

const styles = (theme) => ({
	rootTab: {
		flexGrow: 1,
	},
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing.unit * 9,
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: "100vh",
		overflow: "auto",
	},
	chartContainer: {
		marginLeft: -22,
	},
	tableContainer: {
		height: 320,
	},
	pad: {
		paddingTop: "5em",
		paddingBottom: "5em",
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
	list: {
		width: 250,
	},
});

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			entries: [],
			value: 0,
			page: "dashboard",
		};
		this.entryRef = null;
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};
	handleChange = (event, value) => {
		console.log(value);
		this.setState({ value });
	};
	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	saveEntry = (entry) => {
		const newEntries = this.state.entries;
		newEntries.push(entry);
		this.setState({ entries: newEntries });
	};

	render() {
		const { childValues, classes } = this.props;
		const { entries, value, open, page } = this.state;
		const { sex, birthdate } = childValues;
		const currentAge = moment
			.duration(moment().diff(moment(birthdate)))
			.as("months");

		window.moment = moment;
		window.currentAge = currentAge;
		let length,
			weight,
			percentile = "N/A";
		let entryDialog = false;
		if (entries.length == 0) {
			entryDialog = true;
		} else {
			({ length, weight, percentile } = entries[entries.length - 1]);
		}
		const mainListItems = (
			<div className={classes.list}>
				<List>
					<ListItem
						button
						selected={page === "dashboard"}
						onClick={(e) => this.setState({ page: "dashboard" })}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItem>

					<ListItem
						button
						selected={page === "education"}
						onClick={(e) => this.setState({ page: "education" })}>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary="Education" />
					</ListItem>
					<ListItem
						button
						selected={page === "milestones"}
						onClick={(e) => this.setState({ page: "milestones" })}>
						<ListItemIcon>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText primary="Milestones" />
					</ListItem>
					<ListItem
						button
						selected={page === "measurements"}
						onClick={(e) =>
							this.setState({ page: "measurements" })
						}>
						<ListItemIcon>
							<BarChartIcon />
						</ListItemIcon>
						<ListItemText primary="Past Measurements" />
					</ListItem>
				</List>
			</div>
		);

		const allData = {
			xAxisCategories: entries.reduce(
				(acc, curr) => [...acc, curr.age],
				[]
			), // 10, 25, 50, 75, 85th percentile
			ten: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr["10"])],
				[]
			),
			twentyfifth: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr["25"])],
				[]
			),
			fifty: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr["50"])],
				[]
			),
			seventyfive: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr["75"])],
				[]
			),
			ninetyfive: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr["95"])],
				[]
			),
			weightArray: entries.reduce(
				(acc, curr) => [...acc, parseFloat(curr.weight)],
				[]
			),
			percentileArray: entries.reduce(
				(acc, curr) => [
					...acc,
					{
						dateEntered: curr.dateEntered,
						weight: curr.weightPounds,
						length: curr.lengthInches,
						y: parseFloat(curr.percentile),
					},
				],
				[]
			),
		};
		console.log(allData);
		const highchartsPercentileOptions = {
			chart: { type: "line" },
			title: { text: "Weight-Length Percentiles Chart" },

			yAxis: {
				title: { text: "Percentile (weight-length)" },
				tickPositions: [0, 10, 25, 50, 75, 85, 95, 100],
				labels: {
					formatter: function() {
						return this.value + "th percentile";
					},
				},
				min: 0,
				max: 100,
				plotBands: [
					{
						// Light air
						from: 0,
						to: 10,
						color: "rgba(68, 170, 213, 0.1)",
					},
					{
						// Light breeze
						from: 10,
						to: 25,
						color: "rgba(0, 0, 0, 0)",
					},
					{
						// Gentle breeze
						from: 25,
						to: 50,
						color: "rgba(68, 170, 213, 0.1)",
					},
					{
						// Moderate breeze
						from: 50,
						to: 75,
						color: "rgba(0, 0, 0, 0)",
					},
					{
						// Fresh breeze
						from: 75,
						to: 85,
						color: "rgba(68, 170, 213, 0.1)",
					},
					{
						// Strong breeze
						from: 85,
						to: 95,
						color: "rgba(0, 0, 0, 0)",
					},
					{
						// High wind
						from: 95,
						to: 100,
						color: "rgba(68, 170, 213, 0.1)",
					},
				],
			},
			tooltip: {
				valueSuffix: "% (weight-length)",
				crosshairs: true,
				shared: true,
				formatter: function() {
					return this.points.reduce(function(s, point) {
						console.log(point, "point", s, "s");
						return `<b>Age Entered:</b> ${
							point.x
						} <br/> <b>Percentile:</b> ${point.y}<br/> <b>Date Entered:</b> ${point.point.dateEntered}<br/> <b>Weight:</b> ${point.point.weight} lbs<br/> <b>Length:</b> ${point.point.length} in`;
					}, "<b>" + this.x + "</b>");
				},
			},
			xAxis: { type: "category", categories: allData.xAxisCategories },
			legend: {
				align: "center",
				verticalAlign: "top",
				layout: "vertical",
			},
			series: [
				{ name: "Child's Percentiles", data: allData.percentileArray },
			],
		};

		const PAGE_NAME = {
			dashboard: "Dashboard",
			education: "Education",
			milestones: "Milestones",
			measurements: "Past Measurements",
		};
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AddEntry
					sex={sex}
					birthdate={birthdate}
					initState={entryDialog}
					saveEntry={this.saveEntry}
				/>
				<AppBar
					position="absolute"
					className={classNames(classes.appBar)}>
					<Toolbar
						disableGutters={!this.state.open}
						className={classes.toolbar}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={() => this.setState({ open: true })}
							className={classNames(
								classes.menuButton,
								this.state.open && classes.menuButtonHidden
							)}>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}>
							{PAGE_NAME[page]}
						</Typography>
						<IconButton
							color="inherit"
							onClick={(e) => console.log("Clicked!")}>
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<SwipeableDrawer
					disableBackdropTransition={!iOS}
					disableDiscovery={iOS}
					open={open}
					onClose={() => this.setState({ open: false })}
					onOpen={() => this.setState({ open: true })}>
					<div
						tabIndex={0}
						role="button"
						onClick={() => this.setState({ open: false })}
						onKeyDown={() =>
							this.setState({
								open: false,
							})
						}>
						{mainListItems}
					</div>
				</SwipeableDrawer>

				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					{page === "milestones" && <Milestones />}
					{page === "education" && <Education />}
					{page === "measurements" && <SimpleTable data={entries} />}
					{page === "dashboard" && (
						<Paper className={classNames(classes.tableContainer)}>
							<Grid
								className={classes.pad}
								container
								direction="row"
								justify="center"
								alignItems="center">
								<Grid item xs={12}>
									<Typography
										variant="h4"
										align="center"
										gutterBottom
										component="h2">
										{percentile}th Percentile
										(weight-length)
									</Typography>
								</Grid>
							</Grid>

							<div className={classes.tableContainer}>
								<Paper className={classes.rootTab}>
									<Tabs
										value={this.state.value}
										onChange={this.handleChange}
										indicatorColor="primary"
										textColor="primary"
										centered>
										<Tab label="Weight-Length Chart" />
										<Tab label="Milestones" />
									</Tabs>

									{value === 0 && (
										<Typography
											component="div"
											style={{
												padding: 8 * 3,
												zIndex: -1,
											}}>
											<HighchartsReact
												highcharts={Highcharts}
												options={
													highchartsPercentileOptions
												}
											/>
										</Typography>
									)}
									{value === 1 && (
										<Typography
											component="div"
											style={{ padding: 8 * 3 }}>
											<Typography
												variant="h5"
												align="center"
												gutterBottom>
												Expected Milestones for your{" "}
												{currentAge.toFixed(1)} Month
												Old
											</Typography>
											<List>
												{milestones[
													(
														Math.ceil(currentAge) +
														0.5
													).toString()
												]
													.split(",")
													.map((m, i) => (
														<ListItem key={i}>
															<ListItemText
																inset
																primary={m.trim()}
															/>
														</ListItem>
													))}
											</List>
										</Typography>
									)}
								</Paper>
							</div>
						</Paper>
					)}
				</main>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
