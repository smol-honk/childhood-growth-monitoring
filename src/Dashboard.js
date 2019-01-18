import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import "./wtrlinf";
import AddEntry from "./AddEntry";
import { Paper, Grid, Tabs, Tab, SwipeableDrawer } from "@material-ui/core";
import SimpleTable from "./SimpleTable";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const drawerWidth = 240;
const standardPercentiles = [
	[10, "red"],
	[25, "#82ca9d"],
	[50, "#B0B0B0"],
	[75, "#ffc658"],
	[85, "red"],
];
const styles = theme => ({
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
});

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			entries: [],
			value: 0,
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
	saveEntry = entry => {
		const newEntries = this.state.entries;
		newEntries.push(entry);
		this.setState({ entries: newEntries });
	};

	render() {
		const { childValues, classes } = this.props;
		const { entries, value, open } = this.state;
		const { sex, birthdate } = childValues;
		let length,
			weight,
			percentile = "N/A";
		let entryDialog = false;
		if (entries.length == 0) {
			entryDialog = true;
		} else {
			({ length, weight, percentile } = entries[entries.length - 1]);
		}

		const allData = {
			xAxisCategories: entries.reduce(
				(acc, curr) => [...acc, curr.age],
				[]
			),
			// 10, 25, 50, 75, 85th percentile
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
				(acc, curr) => [...acc, parseInt(curr.weight)],
				[]
			),
		};
		console.log(allData);
		const highchartsOptions = {
			chart: { type: "spline", zoomType: "xy" },
			title: { text: "Weight Chart" },
			subtitle: { text: "With accompanying percentiles" },
			xAxis: { type: "category", categories: allData.xAxisCategories },
			yAxis: { title: { text: "Weight (kg)" } },
			tooltip: { valueSuffix: " kg", crosshairs: true, shared: true },
			legend: { align: "left", verticalAlign: "top", borderWidth: 0 },
			plotOptions: {
				spline: {
					dataLabels: { enabled: true },
					states: { hover: { lineWidth: 5 } },
				},
			},
			series: [
				{ name: "10th Percentile", data: allData.ten },
				{ name: "25th Percentile", data: allData.twentyfifth },
				{ name: "50th Percentile", data: allData.fifty },
				{ name: "75th Percentile", data: allData.seventyfive },
				{ name: "95th Percentile", data: allData.ninetyfive },
				{
					name: "Child's Weight",
					data: allData.weightArray,
					marker: { radius: 4 },
					lineWidth: 4,
				},
			],
			navigation: { menuItemStyle: { fontSize: "10px" } },
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
							Dashboard
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<SwipeableDrawer
					open={open}
					onClose={() => this.setState({ open: false })}
					onOpen={() => this.setState({ open: true })}>
					<div
						tabIndex={0}
						role="button"
						onClick={() => this.setState({ open: false })}
						onKeyDown={() => this.setState({ open: false })}>
						{mainListItems}
					</div>
				</SwipeableDrawer>
				{/* <Drawer
					variant="permanent"
					classes={{
						paper: classNames(
							classes.drawerPaper,
							!this.state.open && classes.drawerPaperClose
						),
					}}
					open={open}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>{mainListItems}</List>
					<Divider />
				</Drawer> */}
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />

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
								</Typography>
							</Grid>
							{/* <Grid item xs={6}>
								<Typography
									variant="h4"
									align="center"
									gutterBottom
									component="h2">
									Percentile
								</Typography>
							</Grid> */}
						</Grid>

						<div className={classes.tableContainer}>
							<Paper className={classes.rootTab}>
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
									<Typography
										component="div"
										style={{ padding: 8 * 3, zIndex: -1 }}>
										<HighchartsReact
											highcharts={Highcharts}
											options={highchartsOptions}
										/>
									</Typography>
								)}
								{value === 1 && (
									<Typography
										component="div"
										style={{ padding: 8 * 3 }}>
										<SimpleTable />
									</Typography>
								)}
							</Paper>
						</div>
					</Paper>
				</main>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
