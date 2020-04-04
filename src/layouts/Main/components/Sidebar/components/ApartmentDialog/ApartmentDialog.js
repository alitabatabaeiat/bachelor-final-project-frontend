import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Divider from '@material-ui/core/Divider';

const apartments = [{
  'id': 4,
  'title': 'گالریا - ۲',
  'city': 'تهران',
  'address': 'خ الهیه - خ گلنار - پ ۵۵'
}, {
  'id': 5,
  'title': 'گالریا - ۱',
  'city': 'تهران',
  'address': 'خ الهیه - خ گلنار - پ ۵۲'
}];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

function ApartmentDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>انتخاب ساختمان</DialogTitle>
      <Divider />
      <List>
        {apartments.map((apartment) => (
          <ListItem
            button
            key={apartment.id}
            onClick={() => handleListItemClick(apartment)}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <ApartmentIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={apartment.title}/>
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addApartment')}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ایجاد ساختمان جدید"/>
        </ListItem>
      </List>
    </Dialog>
  );
}

ApartmentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default ApartmentDialog;
