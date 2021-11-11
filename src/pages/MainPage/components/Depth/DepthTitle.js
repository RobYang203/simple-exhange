import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: 5,
    },
  };
});

function DepthTitle({ rightText, leftText }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} item>
      <Grid container justify='space-between'>
        <Grid item>
          <Typography variant='h6'>{leftText}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6'>{rightText}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

DepthTitle.propTypes = {
  rightText: PropTypes.string.isRequired,
  leftText: PropTypes.string.isRequired,
};

export default DepthTitle;
