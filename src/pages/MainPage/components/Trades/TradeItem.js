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

function TradeItem({ time, price, quantity }) {
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

TradeItem.propTypes = {
  time: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

export default TradeItem;
