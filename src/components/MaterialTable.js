import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "auto",
  },
  header: {
    backgroundColor: "#e0e0e0",
  },
  measurement: {
    backgroundColor: "#E5EDF7",
  },
  sticky: {
    position: "-webkit-sticky",
    // eslint-disable-next-line
    position: "sticky",
    left: 0,
    zIndex: 1,
    background: "#fff",
    fontWeight: "fontWeightMedium",
    fontSize: "15pt",
  },
  stickyHeader: {
    background: "#e0e0e0",
  },
  stickyMeasurement: {
    background: "#E5EDF7",
  },
});

const MaterialTable = ({ data, headers, measurement }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell className={`${classes.sticky} ${classes.stickyHeader}`}>
              Experiment
            </TableCell>
            {data.map((experiment) => (
              <TableCell key={experiment[0]} align="right">
                {experiment[0]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.measurement}>
            <TableCell
              className={`${classes.sticky} ${classes.stickyMeasurement}`}
              component="th"
              scope="row"
            >
              {measurement}
            </TableCell>
            {data.map((experiment) => (
              <TableCell
                className={classes.measurement}
                component="th"
                scope="row"
                key={experiment[0]}
              >
                {experiment[1]["outputs"][measurement]}
              </TableCell>
            ))}
          </TableRow>
          {headers.map((name) => (
            <TableRow key={name}>
              <TableCell className={classes.sticky} component="th" scope="row">
                {name}
              </TableCell>
              {data.map((experiment) => (
                <TableCell key={experiment[0]} component="th" scope="row">
                  {experiment[1]["inputs"][name]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
