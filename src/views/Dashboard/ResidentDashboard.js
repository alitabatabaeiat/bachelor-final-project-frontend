import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LastDeclaredChargeBill from './components/LastDeclaredChargeBill';
import LastChargeChart from './components/LastChargeChart';
import { useDispatch } from 'react-redux';
import * as UnitsAction from '../../store/units/UnitsAction';
import * as ChargesAction from '../../store/charges/ChargesAction';
import * as ApartmentsAction from '../../store/apartments/ApartmentsAction';



const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChargesAction.requestGetUnitLastCharge())
  }, []);

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
