import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ExpensesToolbar, ExpensesTable } from './components';
import ExpenseFormDialog from './components/ExpenseFormDialog';
import ExpenseTypeDialog from './components/ExpenseTypeDialog/ExpenseTypeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ExpenseList = () => {
  const [expenseFormDialogOpen, setExpenseFormDialogOpen] = useState(false);
  const [expenseTypeDialogOpen, setExpenseTypeDialogOpen] = useState(false);

  const classes = useStyles();

  const handleExpenseFormDialogOpen = () => {
    setExpenseFormDialogOpen(true);
  };

  const handleExpenseTypeDialogOpen = () => {
    setExpenseTypeDialogOpen(true);
  };

  const handleExpenseFormDialogClose = () => {
    setExpenseFormDialogOpen(false);
  };

  const handleExpenseTypeDialogClose = () => {
    setExpenseTypeDialogOpen(false);
  };

  return (
    <div className={classes.root}>
      <ExpensesToolbar onCreateApartmentExpenseClick={handleExpenseFormDialogOpen} />
      <div className={classes.content}>
        <ExpensesTable />
      </div>
      <ExpenseFormDialog
        onClose={handleExpenseFormDialogClose}
        onOpenExpenseTypeDialog={handleExpenseTypeDialogOpen}
        onSubmit={handleExpenseFormDialogClose}
        open={expenseFormDialogOpen}
      />
      <ExpenseTypeDialog
        onClose={handleExpenseTypeDialogClose}
        onSubmit={handleExpenseTypeDialogClose}
        open={expenseTypeDialogOpen}
      />
    </div>
  );
};

export default ExpenseList;
