import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import * as NotificationsAction from '../../../../store/notifications/NotificationsAction';
import clsx from 'clsx';
import validate from '../../../../helpers/validate';
import { createNotificationSchema } from './NotificationFormValidation';
import handleInputChange from '../../../../helpers/handleInputChange';
import _ from 'lodash';


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
  const { notification, onSubmit } = props;

  const [state, setState] = React.useState({
    title: undefined,
    body: undefined
  });

  useEffect(() => {
    if (notification)
      setState(_.pick(notification, ['title', 'body']));
  }, [props.notification]);

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
      await dispatch(NotificationsAction.requestCreateNotification(data));
      await dispatch(NotificationsAction.requestAllNotifications());

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
          disabled={notification}
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
          disabled={notification}
          error={hasError(errors, 'body')}
          helperText={hasError(errors, 'body') ? errors.body.message : 'متن اعلان را وارد کنید'}
          inputProps={{
            name: 'body'
          }}
          label="متن"
          margin="dense"
          multiline
          onChange={localHandleInputChange}
          rows={4}
          value={state.body}
          variant="outlined"
        />
      </div>

      {
        !notification &&
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
      }
    </form>
  );
};

NotificationForm.propTypes = {
  notification: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NotificationForm;
