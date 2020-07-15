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
import * as ApartmentsAction from '../../../../../../store/apartments/ApartmentsAction';
import { useDispatch } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  dialogContent: {
    maxHeight: '50vh'
  }
});

function ChooseDialog(props) {
  const classes = useStyles();
  const { onClose, open, list, onItemClick, onDeleteClick } = props;

  const history = useHistory();

  const handleItemClick = item => {
    onItemClick(item);
    history.push('/dashboard');
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle>انتخاب</DialogTitle>
      <DialogContent
        className={classes.dialogContent}
        dividers
      >
        <List>
          {list.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <ApartmentIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title}/>
              {
                onDeleteClick &&
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => onDeleteClick(item.id)}
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </ListItemSecondaryAction>
              }
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <ListItem
          autoFocus
          button
          onClick={() => onItemClick('addApartment')}
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

ChooseDialog.propTypes = {
  list: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  onItemClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ChooseDialog;
