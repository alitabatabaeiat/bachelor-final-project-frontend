import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

import {
  Residents,
  LastDeclaredCharge,
  ExpensesSeperation,
} from './components';
import LatestDeclaredCharges from './components/LatestDeclaredCharges';

const Dashboard = () => {
  return (
    <Fragment>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Residents />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <LastDeclaredCharge />
        </Grid>
        <Grid
          item
          lg={6}
          sm={0}
          xl={6}
          xs={0}
        />
        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestDeclaredCharges />
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <ExpensesSeperation />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
