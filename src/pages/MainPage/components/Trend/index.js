import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  makeStyles,
} from '@material-ui/core';
import DepthTitle from './TrendTitle';
import DepthItem from './TrendItem';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      padding: 15,
    },
  };
});

function TrendBox() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title='Trend' />
      <CardContent>
        <Grid container direction='column'>
          <DepthTitle leftText='Time' centerText='Price' rightText='Quantity' />
          <Divider />
          <List className={classes.list}>
            <DepthItem leftText='Price' rightText='Quantity' />
            <DepthItem leftText='Price' rightText='Quantity' />
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TrendBox;
