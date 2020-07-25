import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HomeWorkIcon from '@material-ui/core/SvgIcon/SvgIcon';

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
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
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
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
