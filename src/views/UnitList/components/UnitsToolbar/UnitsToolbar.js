import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import * as UnitsAction from '../../../../store/units/UnitsAction';


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

const UnitsToolbar = props => {
  const { className } = props;

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleCreateUnitClick = () => {
    dispatch(UnitsAction.setFormDialogOpen(true));
    dispatch(UnitsAction.setFormDialogUpdate(false));
  };

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={handleCreateUnitClick}
          startIcon={<AddIcon/>}
          variant="contained"
        >
          ایجاد واحد
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="جستجو"
        />
      </div>
    </div>
  );
};

UnitsToolbar.propTypes = {
  className: PropTypes.string
};

export default UnitsToolbar;