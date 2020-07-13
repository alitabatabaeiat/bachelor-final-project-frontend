import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NotificationForm from './NotificationForm';
import { Typography } from '@material-ui/core';

const NotificationFormDialog = props => {
  const { open, onClose, onSubmit } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          اعلان جدید
        </Typography>
      </DialogTitle>
      <DialogContent>
        <NotificationForm
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

NotificationFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default NotificationFormDialog;
