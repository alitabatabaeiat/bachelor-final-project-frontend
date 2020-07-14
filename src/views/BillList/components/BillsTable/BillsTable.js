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
import { selectCharges } from './BillsSelector';
import * as ChargesAction from '../../../../store/charges/ChargesAction';
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

const BillsTable = props => {
  const role = useSelector(state => state.user.role);
  const charges = useSelector(selectCharges);

  const dispatch = useDispatch();

  const getCharges = () => {
    if (role === 'manager')
      dispatch(ChargesAction.requestGetAllApartmentCharges());
    else
      dispatch(ChargesAction.requestGetAllUnitCharges());
  };

  // useEffect(getCharges, []);

  useEffect(getCharges, [role]);

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
                  {/*<TableCell>شارژ اضطراری</TableCell>*/}
                  {
                    role === 'manager' &&
                    <TableCell>جمع شارژ</TableCell>
                  }
                  {
                    role === 'resident' &&
                    <TableCell>سهم شارژ</TableCell>
                  }
                  {
                    role === 'resident' &&
                    <TableCell>وضعیت پرداخت</TableCell>
                  }
                  {/*<TableCell>مهلت پرداخت</TableCell>*/}
                  {/*<TableCell>جریمه دیرکرد</TableCell>*/}
                  <TableCell>شامل شارژ ثابت</TableCell>
                  <TableCell>تاریخ ثبت</TableCell>
                  {/*<TableCell>عملیات</TableCell>*/}
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
                    <TableCell>{role === 'manager' ? charge.title : charge.charge.title}</TableCell>
                    {/*<TableCell>*/}
                    {/*  {*/}
                    {/*    charge.isEmergency ?*/}
                    {/*      <DoneIcon*/}
                    {/*        fontSize="small"*/}
                    {/*        style={{ color: green[500] }}*/}
                    {/*      /> :*/}
                    {/*      <ClearIcon*/}
                    {/*        color="error"*/}
                    {/*        fontSize="small"*/}
                    {/*      />*/}
                    {/*  }*/}
                    {/*</TableCell>*/}
                    <TableCell>{toPersianNumberWithComma(role === 'manager' ? charge.totalAmount : charge.amount) + ' ریال'}</TableCell>
                    {
                      role === 'resident' &&
                      <TableCell>
                        {
                          charge.isPaid ?
                            <Typography
                              style={{ color: green[500] }}
                              varaint="span"
                            >تسویه شده</Typography> :
                            <Typography
                              style={{ color: red[500] }}
                              varaint="span"
                            >تسویه نشده</Typography>
                        }
                      </TableCell>
                    }
                    {/*<TableCell>*/}
                    {/*  {*/}
                    {/*    charge.paymentDeadline ? toPersianNumberWithComma(charge.paymentDeadline) :*/}
                    {/*      <ClearIcon*/}
                    {/*        color="error"*/}
                    {/*        fontSize="small"*/}
                    {/*      />*/}
                    {/*  }*/}
                    {/*</TableCell>*/}
                    {/*<TableCell>*/}
                    {/*  {*/}
                    {/*    charge.delayPenalty ? toPersianNumberWithComma(charge.delayPenalty) :*/}
                    {/*      <ClearIcon*/}
                    {/*        color="error"*/}
                    {/*        fontSize="small"*/}
                    {/*      />*/}
                    {/*  }*/}
                    {/*</TableCell>*/}
                    <TableCell>
                      {
                        (role === 'manager' && charge.includeFixedCharge) || (role === 'resident' && charge.charge.includeFixedCharge) ?
                          <DoneIcon
                            fontSize="small"
                            style={{ color: green[500] }}
                          /> :
                          <ClearIcon
                            color="error"
                            fontSize="small"
                          />
                      }
                    </TableCell>
                    <TableCell>
                      {toPersianNumber(moment(charge.createdAt).locale('fa').format('YYYY/MM/DD'))}
                    </TableCell>
                    {/*<TableCell>*/}
                    {/*  <Box*/}
                    {/*    component="span"*/}
                    {/*    mr={2}*/}
                    {/*  >*/}
                    {/*    <Button*/}
                    {/*      className={classes.button}*/}
                    {/*      color="primary"*/}
                    {/*      disabled*/}
                    {/*      size="small"*/}
                    {/*      variant="contained"*/}
                    {/*    >*/}
                    {/*      ریز هزینه‌ها*/}
                    {/*    </Button>*/}
                    {/*  </Box>*/}
                    {/*  {*/}
                    {/*    role === 'manager' ?*/}
                    {/*      <Button*/}
                    {/*        className={classes.button}*/}
                    {/*        color="secondary"*/}
                    {/*        disabled*/}
                    {/*        size="small"*/}
                    {/*        variant="contained"*/}
                    {/*      >*/}
                    {/*        صورتحساب واحدها*/}
                    {/*      </Button> :*/}
                    {/*      <Button*/}
                    {/*        className={classes.button}*/}
                    {/*        color="secondary"*/}
                    {/*        disabled*/}
                    {/*        size="small"*/}
                    {/*        variant="contained"*/}
                    {/*      >*/}
                    {/*        پرداخت*/}
                    {/*      </Button>*/}
                    {/*  }*/}
                    {/*</TableCell>*/}

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

BillsTable.propTypes = {};

export default BillsTable;
