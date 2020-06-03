import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import * as ExpenseTypesAction from '../../../../store/expenseTypes/ExpenseTypesAction';
import * as ApartmentsAction from '../../../../store/apartments/ApartmentsAction';
import * as UnitsAction from '../../../../store/units/UnitsAction';
import clsx from 'clsx';
import validate from '../../../../helpers/validate';
import { createExpenseTypeSchema } from './ExpenseFormValidation';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  errorContainer: {
    marginTop: theme.spacing(-.75),
    marginLeft: theme.spacing(2.5)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  addExpenseTypeButton: {
    marginTop: theme.spacing(1)
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  },
  colorButton: {
    margin: theme.spacing(.5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  },
  color: {
    width: '100%',
    height: 16,
    borderRadius: 2
  },
  submitButton: {
    marginLeft: 'auto'
  }
}));

const ExpenseTypeForm = props => {
  const { onSubmit } = props;

  const colors = ['190ad0', 'd00021', 'd40d83', '00BFFF', 'FFF176', 'ef5350',
    'd09c67', 'f26d7d', 'ff7043', 'f26d7d', 'ff7043', '8bc34a', '26a69a', '5c6bc0'];

  const [state, setState] = React.useState({
    title: undefined,
    color: undefined
  });
  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExpenseTypesAction.requestAllExpenseTypes());
    dispatch(ApartmentsAction.requestAllExpenseOptions());
    dispatch(UnitsAction.requestAllUnits());
  }, [dispatch]);

  const classes = useStyles();

  const handleAddExpenseType = () => {
    console.log('handleAddExpenseType');
  };

  const handleChange = async event => {
    const name = event.target.name;
    await setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleColorClick = color => {
    setState({
      ...state,
      color
    });
  };

  const handleSubmit = async () => {
    // validation
    const data = {
      ...state
    };

    const errors = validate(createExpenseTypeSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(ExpenseTypesAction.requestCreateExpenseType(data));

      onSubmit();
    }
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <form className={classes.formContainer}>
      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'title')}
          helperText={hasError(errors, 'title') ? errors.title.message : 'عنوان نوع هزینه را وارد کنید'}
          inputProps={{
            name: 'title'
          }}
          label="عنوان"
          margin="dense"
          onChange={handleChange}
          required
          value={state.title}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        {
          colors.map(color => (
            <Button
              className={classes.colorButton}
              color={state.color === color ? 'primary' : undefined}
              onClick={() => handleColorClick(color)}
              variant="outlined"
            >
              <span
                className={classes.color}
                style={{
                  backgroundColor: '#' + color
                }}
              />
            </Button>
          ))
        }
      </div>

      {hasError(errors, 'color') ?
        <div className={clsx(classes.formRowContainer, classes.errorContainer)}>
          <Typography
            color="error"
            variant="caption"
          >
            {errors.color.message}
          </Typography>
        </div> : null}

      <div className={classes.formRowContainer}>
        <Button
          className={classes.submitButton}
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

ExpenseTypeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ExpenseTypeForm;
