import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChooseDialog from '../ChooseDialog';
import { useDispatch, useSelector } from 'react-redux';
import * as ApartmentsAction from '../../../../../../store/apartments/ApartmentsAction';
import * as UserAction from '../../../../../../store/user/UserAction';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Apartment = props => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const apartments = useSelector(state => state.apartments.apartments);

  const currentApartment = useSelector(state => state.user.currentApartment);

  const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    dispatch(ApartmentsAction.requestAllApartments());
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    dispatch(UserAction.changeCurrentApartment(value));
    handleClose();
  };

  const handleDeleteClick = (id) => {
    dispatch(ApartmentsAction.requestDeleteApartment(id));
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
        startIcon={<ApartmentIcon/>}
      >ساختمان های من</Button>
      <div className={classes.content}>
        <Typography
          align="center"
          variant="h6"
        >
          {currentApartment.title}
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          کد: {currentApartment.id}
        </Typography>
      </div>
      <ChooseDialog
        list={apartments}
        onClose={handleClose}
        onDeleteClick={handleDeleteClick}
        onItemClick={handleListItemClick}
        open={open}
      />
    </div>
  );
};

Apartment.propTypes = {
  className: PropTypes.string
};

export default Apartment;
