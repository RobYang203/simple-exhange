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
import { useSelector } from 'react-redux';
import format from 'date-fns/format';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      padding: 15,
    },
  };
});

function TradeBox() {
  const classes = useStyles();
  const trades = useSelector(({ market }) => market.trades);
  return (
    <Card>
      <CardHeader title='Trade' />
      <CardContent>
        <Grid container direction='column'>
          <TradeTitle leftText='Time' centerText='Price' rightText='Quantity' />
          <Divider />
          <List className={classes.list}>
            {trades.map((trade) => {
              return (
                <TradeItem
                  price={trade.p}
                  time={format(new Date(trade.T), 'hh:mm:ss.SS')}
                  quantity={trade.q}
                />
              );
            })}
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TradeBox;
