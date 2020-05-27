import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ExpensesToolbar, ExpensesTable } from './components';
import mockData from './data';
import ExpenseFormDialog from './components/ExpenseFormDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ExpenseList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <ExpensesToolbar />
      <div className={classes.content}>
        <ExpensesTable users={users} />
      </div>
      <ExpenseFormDialog
        onClose={() => {}}
        onSubmit={() => {}}
        open
      />
    </div>
  );
};

export default ExpenseList;
