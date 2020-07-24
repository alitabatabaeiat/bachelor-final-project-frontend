import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { NotificationsTable, NotificationsToolbar } from './components';
import NotificationFormDialog from './components/NotificationFormDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const NotificationList = () => {
  const [notificationFormDialogOpen, setNotificationFormDialogOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const classes = useStyles();

  const handleNotificationFormDialogOpen = () => {
    setNotificationFormDialogOpen(true);
  };

  const handleNotificationFormDialogClose = () => {
    setNotificationFormDialogOpen(false);
    setNotification(null);
  };

  const handleRowClick = notification => {
    setNotificationFormDialogOpen(true);
    setNotification(notification);
  };
  return (
    <div className={classes.root}>
      <NotificationsToolbar onCreateNotificationClick={handleNotificationFormDialogOpen} />
      <div className={classes.content}>
        <NotificationsTable
          onRowClick={handleRowClick}
        />
      </div>
      <NotificationFormDialog
        notification={notification}
        onClose={handleNotificationFormDialogClose}
        onSubmit={handleNotificationFormDialogClose}
        open={notificationFormDialogOpen}
      />
    </div>
  );
};

export default NotificationList;
