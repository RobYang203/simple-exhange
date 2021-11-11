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
    dividerMark: {
      position: 'relative',
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
            <DepthItem price='Price' quantity='Quantity' />
            <DepthItem price='Price' quantity='Quantity' />
          </List>
          <div className={classes.dividerMark}>
            <Typography className={classes.mark}>Ask</Typography>
            <Divider />
            <Typography className={classes.mark}>Bid</Typography>
          </div>
          <List className={classes.list}>
            <DepthItem price='Price' quantity='Quantity' />
            <DepthItem price='Price' quantity='Quantity' />
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DepthBox;
