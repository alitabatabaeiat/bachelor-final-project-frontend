import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { selectApartments } from '../../../../../../selectors/apartments/ApartmentsSelector';
import * as ApartmentsAction from '../../../../../../store/apartments/ApartmentsAction';
import { useDispatch, useSelector } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  dialogContent: {
    maxHeight: '50vh'
  }
});

function ApartmentDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ApartmentsAction.requestAllApartments());
  }, [dispatch]);

  const apartments = useSelector(selectApartments);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleDeleteClick = (id) => {
    dispatch(ApartmentsAction.requestDeleteApartment(id));
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle>انتخاب ساختمان</DialogTitle>
      <DialogContent
        className={classes.dialogContent}
        dividers
      >
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
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteClick(apartment.id)}
                >
                  <DeleteIcon fontSize="small"/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
}

ApartmentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default ApartmentDialog;
