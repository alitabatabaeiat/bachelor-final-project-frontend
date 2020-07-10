import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PanToolIcon from '@material-ui/icons/PanTool';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { Profile, SidebarNav, Apartment } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'داشبورد',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'هزینه ها',
      href: '/expenses',
      icon: <AccountBalanceWalletIcon />
    },
    {
      title: 'واحد ها',
      href: '/units',
      icon: <MeetingRoomIcon />
    },
    // {
    //   title: 'ورود',
    //   href: '/sign-in',
    //   icon: <TextFieldsIcon />
    // },
    {
      title: 'اعلام شارژ',
      href: '/declare-charge',
      icon: <PanToolIcon />
    },

    {
      title: 'صورتحساب',
      href: '/bills',
      icon: <ReceiptIcon />
    },

    {
      title: 'گزارشات',
      href: '/reports',
      icon: <AssessmentIcon />,
      disabled: true
    },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },
    {
      title: 'پروفایل',
      href: '/account',
      icon: <AccountBoxIcon />,
      disabled: true
    },
    {
      title: 'تنظیمات',
      href: '/settings',
      icon: <SettingsIcon />,
      disabled: true
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <Apartment />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
