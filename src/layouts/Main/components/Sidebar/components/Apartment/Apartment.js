import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Apartment = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Button
        color="primary"
        size="large"
      >ساختمان های من</Button>
      <div className={classes.content}>
        <Typography
          align="center"
          variant="h6"
        >
          ساختمان گالریا
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          کد: ۱۰۴۵
        </Typography>
      </div>
    </div>
  );
};

Apartment.propTypes = {
  className: PropTypes.string
};

export default Apartment;
