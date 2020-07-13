import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const NotificationsToolbar = props => {
  const { className, onCreateNotificationClick } = props;

  const classes = useStyles();

  const role = useSelector(state => state.user.role);

  return (
    <div
      className={clsx(classes.root, className)}
    >
      {
        role === 'manager' &&
        <div className={classes.row}>
          <span className={classes.spacer}/>
          <Button
            color="primary"
            onClick={onCreateNotificationClick}
            startIcon={<AddIcon/>}
            variant="contained"
          >
            اعلان جدید
          </Button>
        </div>
      }
      {/*<div className={classes.row}>*/}
      {/*  <SearchInput*/}
      {/*    className={classes.searchInput}*/}
      {/*    placeholder="جستجو"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

NotificationsToolbar.propTypes = {
  className: PropTypes.string,
  onCreateNotificationClick: PropTypes.func
};

export default NotificationsToolbar;
