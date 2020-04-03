import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Button } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

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

  const user = {
    name: 'سید علی طباطبایی آل طه',
    avatar: '/images/avatars/avatar_11.png',
    role: 'مدیر'
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
        src={user.avatar}
        to="/settings"
      />
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
        size="small"
        variant="outlined"
      >
        {user.role}
      </Button>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
