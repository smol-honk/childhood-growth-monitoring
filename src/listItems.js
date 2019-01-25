import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";

export const mainListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>

		<ListItem button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Education" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Milestones" />
		</ListItem>
	</div>
);

// export const secondaryListItems = (
// 	<div>
// 		<ListSubheader inset>Saved reports</ListSubheader>
// 		<ListItem button>
// 			<ListItemIcon>
// 				<AssignmentIcon />
// 			</ListItemIcon>
// 			<ListItemText primary="Current Month" />
// 		</ListItem>
// 		<ListItem button>
// 			<ListItemIcon>
// 				<AssignmentIcon />
// 			</ListItemIcon>
// 			<ListItemText primary="Current Year" />
// 		</ListItem>
// 	</div>
// );
