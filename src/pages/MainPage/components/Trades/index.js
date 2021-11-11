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
import TradeTitle from './TradeTitle';
import TradeItem from './TradeItem';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      padding: 15,
    },
  };
});

function TradeBox() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title='Trade' />
      <CardContent>
        <Grid container direction='column'>
          <TradeTitle leftText='Time' centerText='Price' rightText='Quantity' />
          <Divider />
          <List className={classes.list}>
            <TradeItem leftText='Price' rightText='Quantity' />
            <TradeItem leftText='Price' rightText='Quantity' />
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TradeBox;
