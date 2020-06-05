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

const StartChargeDeclarationForm = props => {
  const {onInputChange, state} = props;
  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleInputChange = async (event, isNumber = false) => {
    await onInputChange(event, isNumber);
  };

  const handleSubmit = async () => {
    const data = {
      ...state
    };

    // const errors = validate(createUnitSchema, data);
    // setErrors(errors);
    // if (!errors) {
    //   await dispatch(UnitsAction.requestCreateUnit(data));
    //
    //   await dispatch(UnitsAction.setFormDialogOpen(false));
    // }
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <form className={classes.formContainer}>
      <div className={classes.formRowContainer}>
        <TextField
          className={classes.formElement}
          error={hasError(errors, 'title')}
          helperText={hasError(errors, 'title') ? errors.title.message : ''}
          inputProps={{
            name: 'title'
          }}
          label="عنوان"
          margin="dense"
          onChange={handleInputChange}
          required
          value={state.title}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={classes.formElement}
          error={hasError(errors, 'paymentDeadline')}
          helperText={hasError(errors, 'paymentDeadline') ? errors.paymentDeadline.message : ''}
          inputProps={{
            name: 'paymentDeadline'
          }}
          label="مهلت پرداخت (روز)"
          margin="dense"
          onChange={event => handleInputChange(event, true)}
          value={toPersianNumberWithComma(state.paymentDeadline)}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={classes.formElement}
          error={hasError(errors, 'delayPenalty')}
          helperText={hasError(errors, 'delayPenalty') ? errors.delayPenalty.message : ''}
          inputProps={{
            name: 'delayPenalty'
          }}
          label="جریمه تأخیر در پرداخت (روزانه)"
          margin="dense"
          onChange={event => handleInputChange(event, true)}
          value={toPersianNumberWithComma(state.delayPenalty)}
          variant="outlined"
        />
      </div>
    </form>
  );
};

StartChargeDeclarationForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default StartChargeDeclarationForm;
