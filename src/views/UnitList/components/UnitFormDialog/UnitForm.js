import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as UnitsAction from '../../../../store/units/UnitsAction';
import { toEnglishNumberWithoutComma, toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import validate from '../../../../helpers/validate';
import { createUnitSchema, updateUnitSchema } from './UnitFormValidation';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';


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
  },
  leftSubmitButton: {
    marginLeft: theme.spacing(1)
  }
}));

const UnitForm = props => {

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

  const units = useSelector(state => state.units);

  useEffect(() => {
    if (units)
      setState({
        ...units.selectedUnit,
        resident: units.selectedUnit.resident ? toPersianNumber('0' + units.selectedUnit.resident.mobileNumber) : undefined
      });
  }, []);

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
    const amount = toEnglishNumberWithoutComma(value);
    await setState({
      ...state,
      [name]: amount
    });
  };

  const handleUpdateSubmit = async () => {
    const {selectedUnit} = units;
    const data = {
      title: state.title !== selectedUnit.title ? state.title : undefined,
      floor: state.floor !== selectedUnit.floor ? state.floor : undefined,
      area: state.area !== selectedUnit.area ? state.area : undefined,
      parkingSpaceCount: state.parkingSpaceCount !== selectedUnit.parkingSpaceCount ? state.parkingSpaceCount : undefined,
      residentCount: state.residentCount !== selectedUnit.residentCount ? state.residentCount : undefined,
      fixedCharge: state.fixedCharge !== selectedUnit.fixedCharge ? state.fixedCharge : undefined,
      isEmpty: state.isEmpty !== selectedUnit.isEmpty ? state.isEmpty : undefined
    };

    const resident = toEnglishNumberWithoutComma(state.resident.substr(1));
    const residentUpdated = resident !== (selectedUnit.resident ? selectedUnit.resident.mobileNumber : undefined);
    console.log(data.isEmpty === undefined  && state.isEmpty === false && residentUpdated)
    if ((data.isEmpty === undefined  && state.isEmpty === false && residentUpdated) || (data.isEmpty === false))
      data.resident = resident;
    else if (data.isEmpty === true)
      data.resident = null;

    const errors = validate(updateUnitSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(UnitsAction.requestUpdateUnit(selectedUnit.id, data));

      await dispatch(UnitsAction.setFormDialogOpen(false));
    }
  };

  const handleCreateSubmit = async () => {
    const data = {
      ...state,
      resident: state.isEmpty ? undefined : toEnglishNumberWithoutComma(state.resident.substr(1))
    };

    const errors = validate(createUnitSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(UnitsAction.requestCreateUnit(data));

      await dispatch(UnitsAction.setFormDialogOpen(false));
    }
  };

  const handleSubmit = async () => {
    if (units.formDialogUpdate)
      await handleUpdateSubmit();
    else
      await handleCreateSubmit();
  };

  const handleDelete = async () => {
    dispatch(UnitsAction.requestDeleteUnit(units.selectedUnit.id));
    dispatch(UnitsAction.setFormDialogOpen(false));
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
          value={toPersianNumber(state.resident)}
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
        {
          units.formDialogUpdate &&
          <Button
            className={classes.submitButton}
            color="secondary"
            onClick={handleDelete}
            startIcon={<DeleteIcon/>}
            variant="contained"
          >
            حذف
          </Button>
        }
        <Button
          className={clsx(classes.submitButton, classes.leftSubmitButton)}
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
};

export default UnitForm;
