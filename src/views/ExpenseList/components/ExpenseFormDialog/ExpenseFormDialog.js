import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import ExpenseForm from './ExpenseForm';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  }
}));

const ExpenseFormDialog = props => {
  const { open, onClose, onSubmit, onOpenExpenseTypeDialog } = props;

  const classes = useStyles();


  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          ثبت هزینه
        </Typography>
      </DialogTitle>
      <DialogContent>
        <ExpenseForm
          onAddExpenseTypeClick={onOpenExpenseTypeDialog}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

ExpenseFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenExpenseTypeDialog: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ExpenseFormDialog;
