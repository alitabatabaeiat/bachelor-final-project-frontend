import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import handleInputChange from '../../helpers/handleInputChange';
import clsx from 'clsx';
import validate from '../../helpers/validate';
import { createNotificationSchema } from '../NotificationList/components/NotificationFormDialog/NotificationFormValidation';
import * as UserAction from '../../store/user/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { signInSchema } from './SignInValidation';
import { selectRequesting } from '../../helpers/requestingSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import usePrevious from '../../helpers/usePrevious';
import { hasErrors, selectErrorText } from '../../helpers/errorSelector';

// const schema = {
//   email: {
//     presence: { allowEmpty: false, message: 'is required' },
//     email: true,
//     length: {
//       maximum: 64
//     }
//   },
//   password: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 128
//     }
//   }
// };

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}));

const SignIn = props => {
  const { history } = props;

  const dispatch = useDispatch();
  const isRequesting = useSelector(state => selectRequesting(state, [UserAction.REQUEST_SIGN_IN]));
  const requestHasErrors = useSelector(state => hasErrors(state, [UserAction.REQUEST_SIGN_IN_FINISHED]));

  const previousIsRequesting = usePrevious(isRequesting);
  useEffect(() => {
    if (previousIsRequesting && !requestHasErrors) {
      history.push('/');
    }
  }, [isRequesting]);

  const classes = useStyles();

  const [formState, setFormState] = useState({});
  const [errors, setErrors] = React.useState({});

  const localHandleInputChange = async (event, options) => await handleInputChange(formState, setFormState, event, options);

  const handleSignIn = async () => {
    const data = {
      ...formState
    };

    const errors = validate(signInSchema, data);
    setErrors(errors);
    console.log(hasError(errors, 'mobileNumber'));

    if (!errors) {
      dispatch(UserAction.requestSignIn(data));
      // history.push('/');
    }
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                سلام، این پروژه جهت پروژه کارشناسی دانشگاه تهران توسط علی طباطبایی نوشته شده است
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Email: A.Tabatabaei97@gmail.com
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  ۱۳۹۸-۱۳۹۹
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}/>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  ورود
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError(errors, 'mobileNumber')}
                  fullWidth
                  helperText={hasError(errors, 'mobileNumber') ? errors.mobileNumber.message : 'شماره موبایل را وارد کنید'}
                  inputProps={{
                    name: 'mobileNumber'
                  }}
                  label="شماره موبایل"
                  margin="dense"
                  onChange={localHandleInputChange}
                  required
                  value={formState.mobileNumber}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError(errors, 'password')}
                  fullWidth
                  helperText={hasError(errors, 'password') ? errors.password.message : 'رمزعبور را وارد کنید'}
                  inputProps={{
                    name: 'password'
                  }}
                  label="رمزعبور"
                  margin="dense"
                  onChange={localHandleInputChange}
                  required
                  type="password"
                  value={formState.password}
                  variant="outlined"
                />
                <div className={classes.wrapper}>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={isRequesting}
                    fullWidth
                    onClick={handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    ورود
                  </Button>
                  {
                    isRequesting &&
                    <CircularProgress
                      className={classes.buttonProgress}
                      color="primary"
                      size={24}
                    />
                  }
                </div>
                {/*<Typography*/}
                {/*  color="textSecondary"*/}
                {/*  variant="body1"*/}
                {/*>*/}
                {/*  Don't have an account?{' '}*/}
                {/*  <Link*/}
                {/*    component={RouterLink}*/}
                {/*    to="/sign-up"*/}
                {/*    variant="h6"*/}
                {/*  >*/}
                {/*    Sign up*/}
                {/*  </Link>*/}
                {/*</Typography>*/}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
