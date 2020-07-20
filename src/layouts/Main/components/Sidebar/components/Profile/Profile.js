import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Button } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as UserAction from '../../../../../../store/user/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  roleButton: {
    paddingTop: 0,
    paddingBottom: 0
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const handleRoleButtonClick = () => {
    history.push('/dashboard');
    dispatch(UserAction.changeRole());
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        to="/settings"
      >
        <AccountCircleIcon style={{fontSize: 70}}/>
      </Avatar>
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Button
        className={classes.roleButton}
        color="primary"
        endIcon={<SwapHorizIcon />}
        onClick={handleRoleButtonClick}
        size="small"
        variant="outlined"
      >
        {user.role === 'manager' ? 'مدیر' : 'ساکن'}
      </Button>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
