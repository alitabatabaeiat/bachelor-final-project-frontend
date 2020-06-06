import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { BillsToolbar, BillsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const BillList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BillsToolbar />
      <div className={classes.content}>
        <BillsTable />
      </div>
    </div>
  );
};

export default BillList;
