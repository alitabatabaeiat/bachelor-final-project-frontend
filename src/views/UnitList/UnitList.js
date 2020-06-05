import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { UnitsToolbar, UnitCard, UnitFormDialog } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnits } from './UnitListSelector';
import * as UnitsAction from '../../store/units/UnitsAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const UnitList = () => {
  const classes = useStyles();

  const unitList = useSelector(selectUnits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UnitsAction.requestAllUnits());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <UnitsToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {unitList.map(unit => (
            <Grid
              item
              key={unit.id}
              lg={4}
              md={6}
              xs={12}
            >
              <UnitCard
                unit={unit}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon/>
        </IconButton>
        <IconButton>
          <ChevronRightIcon/>
        </IconButton>
      </div>
      <UnitFormDialog />
    </div>
  );
};

export default UnitList;
