import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as UnitsAction from '../../../../store/units/UnitsAction';
import { toEnglishNumberWithoutComma, toPersianNumberWithComma } from '../../../../helpers/persian';
import validate from '../../../../helpers/validate';
import { createUnitSchema } from './UnitFormValidation';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formElement: {
    flexGrow: 20,
    flexBasis: 0
  },
  addExpenseTypeButton: {
    marginTop: theme.spacing(1)
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  },
  isEmptyCheckbox: {
    flexGrow: 1,
    padding: 0,
    marginRight: theme.spacing(1)
  },
  submitButton: {
    marginLeft: 'auto'
  }
}));

const UnitForm = props => {
  const { onSubmit } = props;

  const [state, setState] = React.useState({
    title: undefined,
    floor: undefined,
    area: undefined,
    parkingSpaceCount: undefined,
    residentCount: undefined,
    fixedCharge: undefined,
    isEmpty: false,
    resident: undefined
  });

  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  const classes = useStyles();

  const handleChange = async event => {
    const name = event.target.name;
    await setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleCheckboxChange = async event => {
    const name = event.target.name;
    await setState({
      ...state,
      [name]: !state[name]
    });
  };

  const handleNumberInputChange = async event => {
    const { name, value } = event.target;
    console.log(value);
    const amount = toEnglishNumberWithoutComma(value);
    await setState({
      ...state,
      [name]: amount
    });
  };



  const handleSubmit = async () => {
    // validation
    const data = {
      ...state,
      resident: state.isEmpty ? undefined : toEnglishNumberWithoutComma(state.resident.substr(1))
    };

    const errors = validate(createUnitSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(UnitsAction.requestCreateUnit(data));

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
          helperText={hasError(errors, 'title') ? errors.title.message : ''}
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

        <TextField
          className={classes.formElement}
          error={hasError(errors, 'fixedCharge')}
          helperText={hasError(errors, 'fixedCharge') ? errors.fixedCharge.message : ''}
          inputProps={{
            name: 'fixedCharge'
          }}
          label="شارژ ثابت"
          margin="dense"
          onChange={handleNumberInputChange}
          value={toPersianNumberWithComma(state.fixedCharge)}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'floor')}
          helperText={hasError(errors, 'floor') ? errors.floor.message : ''}
          inputProps={{
            name: 'floor'
          }}
          label="طبقه"
          margin="dense"
          onChange={handleNumberInputChange}
          required
          value={toPersianNumberWithComma(state.floor)}
          variant="outlined"
        />

        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'area')}
          helperText={hasError(errors, 'area') ? errors.area.message : ''}
          inputProps={{
            name: 'area'
          }}
          label="متراژ"
          margin="dense"
          onChange={handleNumberInputChange}
          required
          value={toPersianNumberWithComma(state.area)}
          variant="outlined"
        />

        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'parkingSpaceCount')}
          helperText={hasError(errors, 'parkingSpaceCount') ? errors.parkingSpaceCount.message : ''}
          inputProps={{
            name: 'parkingSpaceCount'
          }}
          label="تعداد پارکینگ‌"
          margin="dense"
          onChange={handleNumberInputChange}
          required
          value={toPersianNumberWithComma(state.parkingSpaceCount)}
          variant="outlined"
        />

        <TextField
          className={classes.formElement}
          error={hasError(errors, 'residentCount')}
          helperText={hasError(errors, 'residentCount') ? errors.residentCount.message : ''}
          inputProps={{
            name: 'residentCount'
          }}
          label="تعداد ساکنین"
          margin="dense"
          onChange={handleNumberInputChange}
          required
          value={toPersianNumberWithComma(state.residentCount)}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <Checkbox
          checked={!state.isEmpty}
          className={clsx(classes.formElement, classes.rightFormElement, classes.isEmptyCheckbox)}
          color="primary"
          defaultChecked
          inputProps={{
            name: 'isEmpty'
          }}
          onChange={handleCheckboxChange}
        />

        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          disabled={state.isEmpty}
          error={hasError(errors, 'resident')}
          helperText={hasError(errors, 'resident') ? errors.resident.message : ''}
          inputProps={{
            name: 'resident'
          }}
          label="شماره موبایل ساکن"
          margin="dense"
          onChange={handleChange}
          value={state.resident}
          variant="outlined"
        />

        <TextField
          className={classes.formElement}
          defaultValue="علی طباطبایی"
          disabled={state.isEmpty}
          InputProps={{
            readOnly: true
          }}
          label="نام ساکن"
          margin="dense"
          variant="outlined"
        />
      </div>

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

UnitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UnitForm;
