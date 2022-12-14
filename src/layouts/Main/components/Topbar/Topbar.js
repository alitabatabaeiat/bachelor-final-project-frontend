import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { useDispatch } from 'react-redux';
import * as UserAction from '../../../../store/user/UserAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoIcon: {
    fontSize: 40,
    marginRight: theme.spacing(1),
    color: 'white'
  },
  logoText: {
    color: 'white',
    marginTop: theme.spacing(1)
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    '& svg': {
      transform: 'rotate(180deg)'
    }
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const dispatch = useDispatch();

  const history = useHistory();

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleSignOut = () => {
    dispatch(UserAction.requestSignOut());
    history.push('/sign-in');
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink
          className={classes.logoContainer}
          to="/"
        >
          <HomeWorkIcon className={classes.logoIcon}/>
          <Typography
            className={classes.logoText}
            variant="h5"
          >
            اپلیکیشن آپارتمان من
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow}/>
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}
          >
            <InputIcon/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
