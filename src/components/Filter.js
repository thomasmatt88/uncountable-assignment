import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  filterElement: {
    margin: "0 5px",
  },
  button: {
    backgroundColor: "#1A72E9",
    color: "white",
    verticalAlign: "middle",
  },
});

const Filter = ({ onSubmitFilter }) => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // local variables necessary because set is asynchronous
    let localMinError = false;
    let localMaxError = false;
    setMinError(localMinError);
    setMaxError(localMaxError);

    if (isNaN(minValue)) {
      localMinError = true;
      setMinError(localMinError);
    }
    if (isNaN(maxValue)) {
      localMaxError = true;
      setMaxError(localMaxError);
    }
    if (!localMinError && !localMaxError) {
      onSubmitFilter(minValue, maxValue);
    }
  };
  //disable built-in validation and autocomplete
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        className={classes.filterElement}
        label="Min Y-Value"
        variant="outlined"
        onChange={(e) => setMinValue(e.target.value)}
        error={minError}
        helperText={minError ? "Must be a number." : null}
      ></TextField>
      <TextField
        className={classes.filterElement}
        label="Max Y-Value"
        variant="outlined"
        onChange={(e) => setMaxValue(e.target.value)}
        error={maxError}
        helperText={maxError ? "Must be a number." : null}
      ></TextField>
      <Button
        className={`${classes.filterElement} ${classes.button}`}
        type="submit"
        variant="contained"
        disableElevation
        size="large"
      >
        Submit Filter
      </Button>
    </form>
  );
};

export default Filter;
