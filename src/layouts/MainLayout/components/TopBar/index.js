import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position={"static"}>
      <Toolbar>
        <Typography className={classes.title}>Food Cart</Typography>
        <div>
          <IconButton color="inherit">
            <HistoryIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
