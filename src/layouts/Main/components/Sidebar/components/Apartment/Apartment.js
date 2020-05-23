import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ApartmentDialog from '../ApartmentDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Apartment = props => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({
    'id': 4,
    'title': 'گالریا - ۲',
    'city': 'تهران',
    'address': 'خ الهیه - خ گلنار - پ ۵۵'
  });

  const { className, ...rest } = props;

  const classes = useStyles();

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value) => {
    setOpen(false);
    if (value)
      setSelectedValue(value);
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
      >ساختمان های من</Button>
      <div className={classes.content}>
        <Typography
          align="center"
          variant="h6"
        >
          {selectedValue.title}
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          کد: {selectedValue.id}
        </Typography>
      </div>
      <ApartmentDialog
        onClose={handleClose}
        open={open}
        selectedValue={selectedValue}
      />
    </div>
  );
};

Apartment.propTypes = {
  className: PropTypes.string
};

export default Apartment;
