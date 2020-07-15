import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChooseDialog from '../ChooseDialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUnit } from './UnitSelector';
import * as UnitsAction from '../../../../../../store/units/UnitsAction';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Unit = props => {
  const [open, setOpen] = React.useState(false);

  const {units, activeUnit} = useSelector(state => state.units);

  const { className, ...rest } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UnitsAction.requestAllUnits());
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    dispatch(UnitsAction.updateActiveUnit(value));
    handleClose();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Button
        color="primary"
        onClick={handleClickOpen}
        size="large"
        startIcon={<ApartmentIcon />}
      >واحد های من</Button>
      <div className={classes.content}>
        <Typography
          align="center"
          variant="h6"
        >
          {activeUnit.title}
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          آپارتمان: {activeUnit.apartment.title}
        </Typography>
      </div>
      <ChooseDialog
        list={units}
        onClose={handleClose}
        onItemClick={handleListItemClick}
        open={open}
      />
    </div>
  );
};

Unit.propTypes = {
  className: PropTypes.string
};

export default Unit;
