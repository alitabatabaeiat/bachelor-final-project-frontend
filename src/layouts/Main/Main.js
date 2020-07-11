import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  blurContent: {
    filter: 'blur(8px)'
  },
  title: {
    padding: theme.spacing(4),
    paddingBottom: 0,
    color: 'white'
  },
  content: {
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Main = props => {
  const { children, title } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });


  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Fragment>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop,
          [classes.blurContent]: false
        })}
      >
        <Topbar onSidebarOpen={handleSidebarOpen}/>
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main className={classes.content}>
          <div className={classes.title}>
            <Typography variant="h2">{title}</Typography>
          </div>
          {children}
          <Footer/>
        </main>
      </div>
      <Backdrop
        className={classes.backdrop}
        // onClick={handleClose}
        open={false}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    </Fragment>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default Main;
