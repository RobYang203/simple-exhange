import { Grid } from '@material-ui/core';
import React from 'react';
import DepthBox from './components/Depth';
import TrendBox from './components/Trend';

function MainPage() {
  return (
    <Grid container justify='space-between' spacing={3}>
      <Grid item xs={12} md={6}>
        <DepthBox />
      </Grid>
      <Grid item xs={12} md={6}>
        <TrendBox />
      </Grid>
    </Grid>
  );
}

export default MainPage;
