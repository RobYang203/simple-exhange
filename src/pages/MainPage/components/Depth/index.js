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
import DepthTitle from './DepthTitle';
import DepthItem from './DepthItem';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      padding: 15,
    },
  };
});

function DepthBox() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title='Depth' />
      <CardContent>
        <Grid container direction='column'>
          <DepthTitle leftText='Price' rightText='Quantity' />
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

export default DepthBox;
