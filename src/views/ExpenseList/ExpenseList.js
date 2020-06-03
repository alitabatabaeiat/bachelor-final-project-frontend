import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ExpensesToolbar, ExpensesTable } from './components';
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
  const [open, setOpen] = useState(true);

  const classes = useStyles();

  const handleExpenseFormDialogOpen = () => {
    setOpen(true);
  };

  const handleExpenseFormDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ExpensesToolbar onCreateApartmentExpenseClick={handleExpenseFormDialogOpen} />
      <div className={classes.content}>
        <ExpensesTable />
      </div>
      <ExpenseFormDialog
        onClose={handleExpenseFormDialogClose}
        onSubmit={handleExpenseFormDialogClose}
        open={open}
      />
    </div>
  );
};

export default ExpenseList;
