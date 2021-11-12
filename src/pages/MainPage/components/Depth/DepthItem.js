import React from 'react';
import { Grid, ListItem, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: 5,
    },
    ask: {
      color: '#f6465d',
    },
    bid: {
      color: '#10cb80',
    },
  };
});

function DepthItem({ price, quantity, type }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Grid container justify='space-between'>
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

DepthItem.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

export default DepthItem;
