import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import * as ApartmentsAction from '../../../../store/apartments/ApartmentsAction';
import clsx from 'clsx';
import validate from '../../../../helpers/validate';
import { createNotificationSchema } from './NotificationFormValidation';
import handleInputChange from '../../../../helpers/handleInputChange';


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
  submitButton: {
    marginLeft: 'auto'
  }
}));

const NotificationForm = props => {
  const { onSubmit } = props;

  const [state, setState] = React.useState({
    title: undefined,
    body: undefined
  });

  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = async () => {
    // validation
    const data = {
      ...state
    };

    const errors = validate(createNotificationSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(ApartmentsAction.requestCreateApartmentExpense(data));

      onSubmit();
    }
  };

  const localHandleInputChange = async (event, options) => await handleInputChange(state, setState, event, options);

  const hasError = (errors, name) => errors && errors[name];

  return (
    <form className={classes.formContainer}>
      <div className={classes.formRowContainer}>
        <TextField
          className={clsx(classes.formElement, classes.rightFormElement)}
          error={hasError(errors, 'title')}
          helperText={hasError(errors, 'title') ? errors.title.message : 'عنوان اعلان را وارد کنید'}
          inputProps={{
            name: 'title'
          }}
          label="عنوان"
          margin="dense"
          onChange={localHandleInputChange}
          required
          value={state.title}
          variant="outlined"
        />
      </div>

      <div className={classes.formRowContainer}>
        <TextField
          className={classes.formElement}
          error={hasError(errors, 'body')}
          helperText={hasError(errors, 'body') ? errors.body.message : ''}
          inputProps={{
            name: 'body'
          }}
          label="توضیحات"
          margin="dense"
          multiline
          onChange={localHandleInputChange}
          rows={4}
          value={state.body}
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

NotificationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NotificationForm;
