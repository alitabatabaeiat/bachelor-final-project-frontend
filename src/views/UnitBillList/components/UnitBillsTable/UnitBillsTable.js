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
import { selectCharges } from './UnitBillsSelector';
import * as ChargesAction from '../../../../store/charges/ChargesAction';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Row from './Row';
import _ from 'lodash';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UnitBillsTable = props => {
  const role = useSelector(state => state.user.role);
  let charges = useSelector(selectCharges);

  const dispatch = useDispatch();

  const getCharges = () => {
    if (role === 'resident')
      dispatch(ChargesAction.requestGetAllUnitCharges());
  };

  useEffect(getCharges, []);

  if (role === 'manager')
    charges = _.sortBy(charges, c => c.unit.title);


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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell>ردیف</TableCell>
                    <TableCell>{role === 'resident' ? 'عنوان شارژ' : 'عنوان واحد'}</TableCell>
                    <TableCell>سهم شارژ</TableCell>
                    <TableCell>وضعیت پرداخت</TableCell>
                    {/*<TableCell>مهلت پرداخت</TableCell>*/}
                    {/*<TableCell>جریمه دیرکرد</TableCell>*/}
                    <TableCell>شامل شارژ ثابت</TableCell>
                    <TableCell>تاریخ ثبت</TableCell>
                    {
                      role === 'manager' &&
                      <TableCell>عملیات</TableCell>
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charges.slice(0, rowsPerPage).map((charge, index) => (
                    <Row
                      charge={charge}
                      rowNumber={index + 1}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/*<CardActions className={classes.actions}>*/}
      {/*  <TablePagination*/}
      {/*    component="div"*/}
      {/*    count={charges.length}*/}
      {/*    onChangePage={handlePageChange}*/}
      {/*    onChangeRowsPerPage={handleRowsPerPageChange}*/}
      {/*    page={page}*/}
      {/*    rowsPerPage={rowsPerPage}*/}
      {/*    rowsPerPageOptions={[5, 10, 25]}*/}
      {/*  />*/}
      {/*</CardActions>*/}
    </Card>
  );
};

UnitBillsTable.propTypes = {};

export default UnitBillsTable;
