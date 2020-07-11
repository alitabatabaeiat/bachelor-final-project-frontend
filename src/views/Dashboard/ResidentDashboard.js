import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import LatestDeclaredCharges from './components/LatestDeclaredCharges';
import LastDeclaredChargeBill from './components/LastDeclaredChargeBill';
import LastChargeChart from './components/LastChargeChart';



const Dashboard = () => {

  return (
    <Fragment>
      <Grid
        container
        spacing={4}
      >

        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <LastDeclaredChargeBill />
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <LastChargeChart />
        </Grid>

      </Grid>
    </Fragment>
  );
};

export default Dashboard;
