import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpensesTable from '../ExpensesTable';
import { makeStyles } from '@material-ui/styles';
// import ExpenseForm from './ExpenseForm';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField';
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
    marginBottom: theme.spacing(1),
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
  const { open, onClose, onSubmit } = props;

  const [state, setState] = React.useState({
    type: null,
    amount: null,
    splitOption: null,
    filterOption: null,
    description: null
  });

  const classes = useStyles();

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleSubmit = () => {
    // validation

    onSubmit();
  };

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
        <ExpenseForm onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  );
};

ExpensesTable.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ExpenseFormDialog;
