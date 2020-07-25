import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import {
  Residents,
  LastDeclaredCharge,
  ExpensesSeperation,
} from './components';
import LatestDeclaredCharges from './components/LatestDeclaredCharges';
import { useDispatch } from 'react-redux';
import * as UnitsAction from '../../store/units/UnitsAction';
import * as ChargesAction from '../../store/charges/ChargesAction';
import * as ApartmentsAction from '../../store/apartments/ApartmentsAction';

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UnitsAction.requestUnitsCount());
    dispatch(ChargesAction.requestGetApartmentLastCharge());
    dispatch(ChargesAction.requestGetAllApartmentCharges({chargesCount: 3}));
    dispatch(ApartmentsAction.requestAllApartmentExpenses());
  }, dispatch);

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
