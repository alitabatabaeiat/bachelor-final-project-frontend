import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import * as ToastsAction from '../../store/toasts/ToastsAction';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Toasts = () => {
  // const [open, setOpen] =

  const toasts = useSelector((state) => state.toasts.items);

  const dispatch = useDispatch();

  const onClickRemoveNotification = id => dispatch(ToastsAction.removeById(id));

  if (toasts.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {toasts.map((model) => (
        <Snackbar
          action={
            <IconButton
              aria-label="close"
              color="secondary"
              onClick={() => onClickRemoveNotification(model.id)}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          key={model.id}
          message={model.message}
          onClose={() => onClickRemoveNotification(model.id)}
          open
        />
      ))}
    </React.Fragment>
  );
};

export default Toasts;
