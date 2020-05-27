import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  typeTextField: {
    flexGrow: 8
  },
  addExpenseTypeButton: {
    marginTop: theme.spacing(1)
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  }
}));

const ExpenseForm = props => {
  const { onSubmit } = props;

  const [state, setState] = React.useState({
    type: null,
    amount: null,
    splitOption: null,
    filterOption: null,
    description: null
  });

  const classes = useStyles();

  const handleAddExpenseType = () => {
    console.log('handleAddExpenseType');
  };

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
    <form className={classes.formContainer}>
      <div className={classes.formRowContainer}>
        <TextField
          className={[classes.formElement, classes.typeTextField, classes.rightFormElement]}
          helperText="نوع هزینه را انتخاب کنید"
          id="outlined-select-currency"
          inputProps={{
            name: 'type'
          }}
          label="نوع"
          margin="dense"
          onChange={handleChange}
          select
          value={state.type}
          variant="outlined"
        >
          <MenuItem
            key={1}
            value={1}
          >
            الکی
          </MenuItem>
        </TextField>

        <Button
          className={[classes.formElement, classes.addExpenseTypeButton]}
          color="primary"
          onClick={handleAddExpenseType}
          size="small"
          startIcon={<AddIcon/>}
          variant="contained"
        >
          ثبت
        </Button>
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={[classes.formElement, classes.rightFormElement]}
          helperText="مبلغ هزینه را وارد کنید"
          label="مبلغ"
          margin="dense"
          variant="outlined"
        />

        <TextField
          className={classes.formElement}
          helperText="نوع تقسیم هزینه را مشخص کنید"
          id="outlined-select-currency"
          inputProps={{
            name: 'splitOption'
          }}
          label="تقسیم بر اساس"
          margin="dense"
          onChange={handleChange}
          select
          value={state.splitOption}
          variant="outlined"
        >
          <MenuItem
            key={1}
            value={1}
          >
            الکی
          </MenuItem>
        </TextField>
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={[classes.formElement, classes.rightFormElement]}
          helperText="مشمولین هزینه را انتخاب کنید"
          id="outlined-select-currency"
          inputProps={{
            name: 'filterOption'
          }}
          label="برای"
          margin="dense"
          onChange={handleChange}
          select
          value={state.filterOption}
          variant="outlined"
        >
          <MenuItem
            key={1}
            value={1}
          >
            الکی
          </MenuItem>
        </TextField>

        <TextField
          className={classes.formElement}
          helperText="شرح هزینه را وارد کنید"
          label="شرح"
          margin="dense"
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleSubmit}
          startIcon={<SaveIcon/>}
          variant="contained"
        >
          ثبت
        </Button>
      </div>
    </form>
  );
};

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ExpenseForm;
