import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import AddIcon from '@material-ui/icons/Add';


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

const UnitBillsToolbar = props => {
  const { className } = props;

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        {/*<SearchInput*/}
        {/*  className={classes.searchInput}*/}
        {/*  placeholder="جستجو"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

UnitBillsToolbar.propTypes = {
  className: PropTypes.string
};

export default UnitBillsToolbar;
