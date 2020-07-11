import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import ManagerDashboard from './ManagerDashboard';
import ResidentDashboard from './ResidentDashboard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const role = useSelector(state => state.user.role)

  return (
    <div className={classes.root}>
      {
        role === 'manager' && <ManagerDashboard />
      }

      {
        role === 'resident' && <ResidentDashboard />
      }
    </div>
  );
};

export default Dashboard;
