import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenseOptions, selectExpenseTypes, selectUnits } from './ExpenseFormSelector';
import * as ExpenseTypesAction from '../../../../store/expenseTypes/ExpenseTypesAction';
import * as ApartmentsAction from '../../../../store/apartments/ApartmentsAction';
import * as UnitsAction from '../../../../store/units/UnitsAction';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { toEnglishNumberWithoutComma, toPersianNumberWithComma } from '../../../../helpers/persian';
import _ from 'lodash';
import UnitCard from './UnitCard';
import { createApartmentExpenseSchema } from './ExpenseFormValidation';
import validate from '../../../../helpers/validate';


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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  unitsRowContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  errorContainer: {
    marginTop: theme.spacing(-.75),
    marginLeft: theme.spacing(2.5)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  typeTextField: {
    flexGrow: 6
  },
  addExpenseTypeButton: {
    marginTop: theme.spacing(1)
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  },
  typeCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing(1)
  },
  unitCoefficient: {
    maxWidth: 100
  },
  submitButton: {
    marginLeft: 'auto'
  }
}));

const ExpenseForm = props => {
  const { onSubmit, onAddExpenseTypeClick } = props;

  const [state, setState] = React.useState({
    type: undefined,
    amount: undefined,
    splitOption: undefined,
    filterOption: undefined,
    description: undefined
  });

  const [coefficients, setCoefficients] = React.useState({});
  const [selectedUnits, setSelectedUnits] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  const types = useSelector(selectExpenseTypes);
  const options = useSelector(selectExpenseOptions);
  const units = useSelector(selectUnits(selectedUnits));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExpenseTypesAction.requestAllExpenseTypes());
    dispatch(ApartmentsAction.requestAllExpenseOptions());
    dispatch(UnitsAction.requestAllUnits());
  }, [dispatch]);

  const classes = useStyles();

  const handleChange = async event => {
    const name = event.target.name;
    await setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleAmountChange = async event => {
    const { name, value } = event.target;
    const amount = toEnglishNumberWithoutComma(value);
    await setState({
      ...state,
      [name]: amount
    });
  };

  const handleSplitOptionChange = async event => {
    if (event.target.value === 6)
      await setCoefficients(_.assign({}, ..._.map(units, u => ({
        [u.id]: 0
      }))));
    await handleChange(event);
  };

  const handleFilterOptionChange = async event => {
    console.log(event.target.value);
    switch (event.target.value) {
      case 1:
        await setSelectedUnits(_.map(units, 'id'));
        break;
      case 2:
        await setSelectedUnits(_.chain(units).filter(['isEmpty', false]).map('id').value());
        break;
      case 3:
        await setSelectedUnits(_.chain(units).filter(['isEmpty', true]).map('id').value());
        break;
      case 4:
        await setSelectedUnits([]);
        break;
    }
    console.log(selectedUnits);
    await handleChange(event);
  };

  const handleCoefficientChange = async event => {
    const coefficientsCopy = {...coefficients};
    coefficientsCopy[event.target.name] = event.target.value ? toEnglishNumberWithoutComma(event.target.value) : 0;
    await setCoefficients(coefficientsCopy);
  };

  const handleOnUnitClick = async (event, unitId) => {
    const inputFocused = document.activeElement === event.currentTarget.getElementsByTagName('input')[0];
    if (state.filterOption === 4 && !inputFocused) {
      let selectedUnitsCopy = [...selectedUnits];
      console.log(selectedUnits);
      console.log(unitId);
      if (_.includes(selectedUnits, unitId))
        _.remove(selectedUnitsCopy, u => u === unitId);
      else
        selectedUnitsCopy.push(unitId);
      await setSelectedUnits(selectedUnitsCopy);
    }
  };

  const handleSubmit = async () => {
    // validation
    const data = {
      ...state,
      coefficients: !_.isEmpty(coefficients) ? _.map(selectedUnits, unitId => coefficients[unitId]) : undefined,
      units: selectedUnits
    };

    const errors = validate(createApartmentExpenseSchema, data);
    if (data.coefficients && !(data.coefficients.find(coefficient => coefficient > 0) > 0))
      errors.coefficients = {
        message: 'باید حداقل یکی از ضرایب واحدهای انتخابی غیر صفر باشد'
      };
    setErrors(errors);
    if (!errors) {
      await dispatch(ApartmentsAction.requestCreateApartmentExpense(data));

      onSubmit();
    }
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <form className={classes.formContainer}>
      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.typeTextField, classes.rightFormElement)}
          error={hasError(errors, 'type')}
          helperText={hasError(errors, 'type') ? errors.type.message : 'نوع هزینه را انتخاب کنید'}
          id="outlined-select-currency"
          inputProps={{
            name: 'type'
          }}
          label="نوع"
          margin="dense"
          onChange={handleChange}
          required
          select
          value={state.type}
          variant="outlined"
        >
          {
            types.map(type => (
              <MenuItem
                key={type.id}
                value={type.id}
              >
                <span
                  className={classes.typeCircle}
                  style={{
                    backgroundColor: '#' + type.color
                  }}
                />
                <span>{type.title}</span>
              </MenuItem>
            ))
          }
        </TextField>

        <Button
          className={clsx(classes.formElement, classes.addExpenseTypeButton)}
          color="primary"
          onClick={onAddExpenseTypeClick}
          size="small"
          startIcon={<AddIcon/>}
          variant="contained"
        >
          نوع جدید
        </Button>
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'amount')}
          helperText={hasError(errors, 'amount') ? errors.amount.message : 'مبلغ هزینه را وارد کنید'}
          inputProps={{
            name: 'amount'
          }}
          label="مبلغ"
          margin="dense"
          onChange={handleAmountChange}
          required
          value={toPersianNumberWithComma(state.amount)}
          variant="outlined"
        />

        <TextField
          className={classes.formElement}
          error={hasError(errors, 'splitOption')}
          helperText={hasError(errors, 'splitOption') ? errors.splitOption.message : 'نوع تقسیم هزینه را مشخص کنید'}
          id="outlined-select-currency"
          inputProps={{
            name: 'splitOption'
          }}
          label="تقسیم بر اساس"
          margin="dense"
          onChange={handleSplitOptionChange}
          required
          select
          value={state.splitOption}
          variant="outlined"
        >
          {options &&
          options.splitOptions.map(splitOption => (
            <MenuItem
              key={splitOption.id}
              value={splitOption.id}
            >
              {splitOption.title}
            </MenuItem>
          ))
          }
        </TextField>
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'filterOption')}
          helperText={hasError(errors, 'filterOption') ? errors.filterOption.message : 'مشمولین هزینه را انتخاب کنید'}
          id="outlined-select-currency"
          inputProps={{
            name: 'filterOption'
          }}
          label="برای"
          margin="dense"
          onChange={handleFilterOptionChange}
          required
          select
          value={state.filterOption}
          variant="outlined"
        >
          {
            options &&
            options.filterOptions.map(filterOption => (
              <MenuItem
                key={filterOption.id}
                value={filterOption.id}
              >
                {filterOption.title}
              </MenuItem>
            ))
          }
        </TextField>

        <TextField
          className={classes.formElement}
          error={hasError(errors, 'description')}
          helperText={hasError(errors, 'description') ? errors.description.message : 'شرح هزینه را وارد کنید'}
          inputProps={{
            name: 'description'
          }}
          label="شرح"
          margin="dense"
          onChange={handleChange}
          value={state.description}
          variant="outlined"
        />
      </div>
      {
        state.filterOption &&
        <div className={clsx(classes.formRowContainer, classes.unitsRowContainer)}>
          {
            units.map((unit) => (
              <UnitCard
                coefficients={coefficients}
                key={unit.id}
                onCoefficientChange={handleCoefficientChange}
                onUnitClick={handleOnUnitClick}
                splitOption={state.splitOption}
                unit={unit}
              />
            ))
          }
        </div>
      }

      {hasError(errors, 'units') ?
        <div className={clsx(classes.formRowContainer, classes.errorContainer)}>
          <Typography
            color="error"
            variant="caption"
          >
            {errors.units.message}
          </Typography>
        </div> : null}

      {hasError(errors, 'coefficients') ?
        <div className={clsx(classes.formRowContainer, classes.errorContainer)}>
          <Typography
            color="error"
            variant="caption"
          >
            {errors.coefficients.message}
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

ExpenseForm.propTypes = {
  onAddExpenseTypeClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ExpenseForm;
