import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'jalali-moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectCharges } from './NotificationsSelector';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  full: {
    width: 40,
    height: 40
  }
}));

const NotificationsTable = props => {
  const role = useSelector(state => state.user.role);

  // const notifications = useSelector(selectCharges);
  const notifications = [
    {
      id: 1,
      title: 'تست',
      body: 'سلام',
      from: 'مدیر ساختمان',
      createdAt: moment()
    }
  ];


  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(ChargesAction.requestGetAllCharges());
  // }, [dispatch]);

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  return (
    <Card
      className={classes.root}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>عنوان</TableCell>
                  <TableCell>متن</TableCell>
                  <TableCell>توسط</TableCell>
                  <TableCell>تاریخ ثبت</TableCell>
                  {
                    role === 'manager' &&
                    <TableCell>عملیات</TableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.slice(0, rowsPerPage).map((notification, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={notification.id}
                  >
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{notification.body}</TableCell>

                    <TableCell>{notification.from}</TableCell>
                    <TableCell>
                      {toPersianNumber(moment(notification.createdAt).locale('fa').format('YYYY/MM/DD'))}
                    </TableCell>
                    {
                      role === 'manager' &&
                      <TableCell>
                        <Button
                          className={classes.button}
                          color="secondary"
                          size="small"
                          variant="contained"
                        >
                          حذف
                        </Button>
                      </TableCell>
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={notifications.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

NotificationsTable.propTypes = {};

export default NotificationsTable;
