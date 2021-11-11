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
            {asks.map((ask) => {
              return <DepthItem price={ask[0]} quantity={ask[1]} />;
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
            {bids.map((bid) => {
              return <DepthItem price={bid[0]} quantity={bid[1]} />;
            })}
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DepthBox;
