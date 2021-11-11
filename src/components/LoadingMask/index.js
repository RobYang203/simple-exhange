import React from "react";
import isEmpty from "lodash/isEmpty";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function LoadingMask() {
  const classes = useStyles();
  const fetchingTypes = useSelector(({ setting }) => setting.fetchingTypes);

  return (
    <Backdrop className={classes.backdrop} open={!isEmpty(fetchingTypes)}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingMask;
