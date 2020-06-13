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
  TablePagination,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectCharges } from './BillsSelector';
import * as ChargesAction from '../../../../store/charges/ChargesAction';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';

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

const BillsTable = props => {
  const charges = useSelector(selectCharges);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChargesAction.requestGetAllCharges());
  }, [dispatch]);

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
                  <TableCell>ردیف</TableCell>
                  <TableCell>عنوان شارژ</TableCell>
                  <TableCell>مهلت پرداخت</TableCell>
                  <TableCell>جریمه دیرکرد</TableCell>
                  <TableCell>شامل شارژ ثابت</TableCell>
                  <TableCell>تاریخ ثبت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charges.slice(0, rowsPerPage).map((charge, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={charge.id}
                  >
                    <TableCell>{toPersianNumber(index + 1)}</TableCell>
                    <TableCell>{charge.title}</TableCell>
                    <TableCell>{charge.paymentDeadline ? toPersianNumberWithComma(charge.paymentDeadline) : <ClearIcon color="error" fontSize="small" />}</TableCell>
                    <TableCell>{charge.delayPenalty ? toPersianNumberWithComma(charge.delayPenalty) : <ClearIcon color="error" fontSize="small" />}</TableCell>
                    <TableCell>{charge.includeFixedCharge ? <DoneIcon style={{ color: green[500] }} fontSize="small" /> : <ClearIcon color="error" fontSize="small" />}</TableCell>
                    <TableCell>
                      {toPersianNumber(moment(charge.createdAt).locale('fa').format('YYYY/MM/DD'))}
                    </TableCell>
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
          count={charges.length}
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

BillsTable.propTypes = {
};

export default BillsTable;
