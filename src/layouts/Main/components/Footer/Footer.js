import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/alitabatabaeiat"
          target="_blank"
        >
          علی طباطبایی
        </Link>
        <Typography variant="displayInline">
          {' '}۱۳۹۸ - ۱۳۹۹
        </Typography>
      </Typography>
      <Typography variant="caption">
        ساخته شده برای پروژه کارشناسی دانشگاه تهران
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
