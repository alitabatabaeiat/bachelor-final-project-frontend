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
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { englishNumber, englishNumberWithCommas } from '../../../../helpers/persian';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import validate from '../../../../helpers/validate';
import { createApartmentExpenseSchema } from './ExpenseFormValidation';


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
  unitButton: {
    margin: theme.spacing(1)
  },
  unit: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
    padding: theme.spacing(1)
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
  },
  typeCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing(1)
  },
  unitCoefficient: {
    maxWidth: 100
  }
}));

const ExpenseForm = props => {
  const { onSubmit } = props;

  const [state, setState] = React.useState({
    type: undefined,
    amount: undefined,
    splitOption: undefined,
    filterOption: undefined,
    description: undefined
  });

  const [coefficients, setCoefficients] = React.useState(undefined);
  const [selectedUnits, setSelectedUnits] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  const types = useSelector(selectExpenseTypes);
  const options = useSelector(selectExpenseOptions);
  const units = useSelector(selectUnits(state, coefficients, selectedUnits));

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

  const handleSplitOptionChange = async event => {
    if (event.target.value === 6)
      await setCoefficients([
        ...Array(units.length).fill(0)
      ]);
    await handleChange(event);
  };

  const handleFilterOptionChange = async event => {
    if (event.target.value === 4) {
      await setSelectedUnits([
        ...Array(units.length).fill(false)
      ]);
      await setCoefficients([
        ...Array(units.length).fill(0)
      ]);
    }
    await handleChange(event);
  };

  const handleCoefficientChange = async event => {
    const coefficientsCopy = [...coefficients];
    coefficientsCopy[event.target.name] = event.target.value ? parseInt(event.target.value) : 0;
    await setCoefficients(coefficientsCopy);
  };

  const handleOnUnitClick = async (event, index) => {
    const inputFocused = document.activeElement === event.currentTarget.getElementsByTagName('input')[0];
    if (state.filterOption === 4 && !inputFocused) {
      const selectedUnitsCopy = [...selectedUnits];
      selectedUnitsCopy[index] = !selectedUnitsCopy[index];
      await setSelectedUnits(selectedUnitsCopy);
    }
  };

  const handleSubmit = () => {
    // validation
    console.log(units);
    console.log(coefficients);
    const data = {
      ...state,
      coefficients: coefficients ? coefficients.filter((coefficient, index) => units[index].selected) : undefined,
      units: units.filter(unit => unit.selected).map(unit => unit.id)
    };

    const errors = validate(createApartmentExpenseSchema, data);
    if (!(data.coefficients.find(coefficient => coefficient > 0) > 0))
      errors.coefficients = {
        message: 'باید حداقل یکی از ضرایب واحدهای انتخابی غیر صفر باشد'
      };
    setErrors(errors);

    onSubmit();
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
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'amount')}
          helperText={hasError(errors, 'amount') ? errors.amount.message : 'مبلغ هزینه را وارد کنید'}
          inputProps={{
            name: 'amount'
          }}
          label="مبلغ"
          margin="dense"
          onChange={handleChange}
          required
          value={state.amount}
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
            name: 'amount'
          }}
          label="شرح"
          margin="dense"
          onChange={handleChange}
          value={state.description}
          variant="outlined"
        />
      </div>

      <div className={clsx(classes.formRowContainer, classes.unitsRowContainer)}>
        {
          state.filterOption &&
          units.map((unit, index) => (
            <ButtonBase
              className={classes.unitButton}
              focusVisibleClassName={classes.focusVisible}
              key={unit.id}
              onClick={(event) => handleOnUnitClick(event, index)}
            >
              <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                badgeContent={
                  unit.selected ?
                    <CheckCircleIcon
                      color="primary"
                      fontSize="small"
                    /> : false
                }
              >
                <Paper className={classes.unit}>
                  <Typography variant="body1">
                    طبقه {englishNumber(unit.floor)} - {unit.title}
                  </Typography>
                  <Typography variant="caption">
                    {unit.resident ? `${unit.resident.firstName ?? 'ساکن ثبت نام نکرده'} ${unit.resident.lastName ?? ''}` : 'واحد خالی'}
                  </Typography>
                  {
                    <Typography variant="caption">
                      {unit.share !== undefined ? englishNumberWithCommas(unit.share.toFixed(0)) + ' ریال' : 'نامشخص'}
                    </Typography>
                  }
                  {
                    state.splitOption === 6 &&
                    <TextField
                      className={classes.unitCoefficient}
                      inputProps={{
                        name: index
                      }}
                      label="ضریب"
                      margin="dense"
                      onChange={handleCoefficientChange}
                      size="small"
                      value={coefficients[index]}
                      variant="outlined"
                    />
                  }
                </Paper>
              </Badge>
            </ButtonBase>
          ))
        }
      </div>

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
