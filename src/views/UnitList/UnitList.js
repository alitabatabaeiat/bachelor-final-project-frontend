import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';

import { UnitsToolbar, UnitCard, UnitFormDialog } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnits } from './UnitListSelector';
import * as UnitsAction from '../../store/units/UnitsAction';
import { toPersianNumber } from '../../helpers/persian';

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
  },
  floorContainer: {
    marginBottom: theme.spacing(2)
  },
  floorTitle: {
    marginBottom: theme.spacing(1)
  },
  floorGrid: {
    marginBottom: theme.spacing(1)
  }
}));

const UnitList = () => {
  const classes = useStyles();

  const unitList = useSelector(selectUnits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UnitsAction.requestAllUnits());
  }, []);

  return (
    <div className={classes.root}>
      <UnitsToolbar/>
      <div className={classes.content}>
        {
          _.map(unitList, (floorUnits, floor) => (
            <div className={classes.floorContainer}>
              <Typography
                className={classes.floorTitle}
                variant="h5"
              >طبقه {toPersianNumber(floor)}</Typography>
              <Grid
                className={classes.floorGrid}
                container
                spacing={3}
              >
                {floorUnits.map(unit => (
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
              {/*<Divider />*/}
            </div>
          ))
        }
      </div>
      {/*<div className={classes.pagination}>*/}
      {/*  <Typography variant="caption">1-6 of 20</Typography>*/}
      {/*  <IconButton>*/}
      {/*    <ChevronLeftIcon/>*/}
      {/*  </IconButton>*/}
      {/*  <IconButton>*/}
      {/*    <ChevronRightIcon/>*/}
      {/*  </IconButton>*/}
      {/*</div>*/}
      <UnitFormDialog/>
    </div>
  );
};

export default UnitList;
