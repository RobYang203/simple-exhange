import React from 'react';
import { Grid, ListItem, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: 5,
    },
  };
});

function TrendItem({ time, price, quantity }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Grid container justify='space-between'>
        <Grid item>
          <Typography>{time}</Typography>
        </Grid>
        <Grid item>
          <Typography>{price}</Typography>
        </Grid>
        <Grid item>
          <Typography>{quantity}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

TrendItem.propTypes = {
  time: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default TrendItem;
