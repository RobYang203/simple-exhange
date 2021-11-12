import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DepthTitle from './DepthTitle';
import DepthItem from './DepthItem';
import cls from 'classnames';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      padding: theme.spacing(3, 5),
    },
    mark: {
      color: '#c0c0c0',
      padding: theme.spacing(2, 0),
      position: 'absolute',
      right: 0,
    },
    markTop: {
      bottom: 0,
    },
    dividerMark: {
      position: 'relative',
    },
  };
});

function DepthBox() {
  const classes = useStyles();
  const { asks, bids } = useSelector(({ market }) => market.depths);

  return (
    <Card>
      <CardHeader title='Depth' />
      <CardContent>
        <Grid container direction='column'>
          <DepthTitle leftText='Price' rightText='Quantity' />
          <Divider />
          <List className={classes.list}>
            {orderBy(asks, 0, 'desc').map((ask) => {
              return (
                <DepthItem
                  key={ask[0]}
                  price={ask[0]}
                  quantity={ask[1]}
                  type='ask'
                />
              );
            })}
          </List>
          <div className={classes.dividerMark}>
            <Typography className={cls(classes.mark, classes.markTop)}>
              Ask
            </Typography>
            <Divider />
            <Typography className={classes.mark}>Bid</Typography>
          </div>
          <List className={classes.list}>
            {orderBy(bids, 0, 'desc').map((bid) => {
              return (
                <DepthItem
                  key={bid[0]}
                  price={bid[0]}
                  quantity={bid[1]}
                  type='bid'
                />
              );
            })}
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DepthBox;
