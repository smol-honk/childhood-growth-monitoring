import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import {Button} from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function SimpleTable(props) {
  const {classes} = props;

  return (
    <Paper className={classes.root}><Table className={classes.table}>
      <TableHead><TableRow><TableCell>Date
          Entered</TableCell>
        <TableCell numeric>Weight (lbs)</TableCell>
        <TableCell numeric>Length(in ) </TableCell>
        <TableCell numeric>Age (in Months)</TableCell>
        <TableCell numeric>Percentile(weight - length) </TableCell>
        <TableCell />
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
              <TableCell><Button>Edit</Button></TableCell>
            </TableRow>
          );
        })}
      </TableBody></Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
