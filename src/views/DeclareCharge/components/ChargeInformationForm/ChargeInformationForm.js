import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import moment from 'jalali-moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';


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

const ChargeInformationForm = props => {
  const { onInputChange, state, errors } = props;

  const priorities = [
    {
      id: 1,
      title: 'بالا'
    },
    {
      id: 2,
      title: 'عادی'
    },
    {
      id: 3,
      title: 'پایین'
    }
  ];

  const classes = useStyles();

  const handleInputChange = async (event, options = {}) => {
    await onInputChange(event, options);
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
        <FormControl
          error={hasError(errors, 'isEmergency')}
          required
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isEmergency}
                color="primary"
                name="isEmergency"
                onChange={event => handleInputChange(event, { isCheckbox: true })}
              />
            }
            label="شارژ اضطراری"
          />
        </FormControl>
        {
          hasError(errors, 'isEmergency') && <FormHelperText>{errors.isEmergency.message}</FormHelperText>
        }
      </div>

      {
        state.isEmergency &&
        <Fragment>
          <div className={classes.formRowContainer}>
            <TextField
              className={clsx(classes.formElement, classes.typeTextField)}
              error={hasError(errors, 'priority')}
              helperText={hasError(errors, 'priority') ? errors.priority.message : 'اولویت را انتخاب کنید'}
              id="outlined-select-currency"
              inputProps={{
                name: 'priority'
              }}
              label="اولویت"
              margin="dense"
              onChange={handleInputChange}
              required
              select
              value={state.priority}
              variant="outlined"
            >
              {
                priorities.map(type => (
                  <MenuItem
                    key={type.id}
                    value={type.id}
                  >
                    {type.title}
                  </MenuItem>
                ))
              }
            </TextField>
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
              onChange={event => handleInputChange(event, { isNumber: true })}
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
              onChange={event => handleInputChange(event, { isNumber: true })}
              value={toPersianNumberWithComma(state.delayPenalty)}
              variant="outlined"
            />
          </div>
        </Fragment>
      }

      <div className={classes.formRowContainer}>
        <FormControl
          error={hasError(errors, 'includeFixedCharge')}
          required
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={state.includeFixedCharge}
                color="primary"
                name="includeFixedCharge"
                onChange={event => handleInputChange(event, { isCheckbox: true })}
              />
            }
            label="شارژ ثابت محاسبه گردد"
          />
        </FormControl>
        {
          hasError(errors, 'includeFixedCharge') && <FormHelperText>{errors.includeFixedCharge.message}</FormHelperText>
        }
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={classes.formElement}
          error={hasError(errors, 'description')}
          helperText={hasError(errors, 'description') ? errors.description.message : ''}
          inputProps={{
            name: 'description'
          }}
          label="توضیحات"
          margin="dense"
          multiline
          onChange={handleInputChange}
          rows={4}
          value={state.description}
          variant="outlined"
        />
      </div>
    </form>
  );
};

ChargeInformationForm.propTypes = {
  errors: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default ChargeInformationForm;
