import React from 'react';
import { Grid, ListItem, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: 5,
    },
    buy: {
      color: '#f6465d',
    },
    sell: {
      color: '#10cb80',
    },
  };
});

function TradeItem({ time, price, quantity, type }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Grid container justify='space-between'>
        <Grid item>
          <Typography>{time}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes[type]}>{price}</Typography>
        </Grid>
        <Grid item>
          <Typography>{quantity}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

TradeItem.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

export default TradeItem;
