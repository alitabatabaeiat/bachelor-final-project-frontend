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
import { selectExpenses } from './ExpensesSelector';
import * as ApartmentsAction from '../../store/apartments/ApartmentsAction';
import { toPersianNumber, toPersianNumberWithComma } from '../../helpers/persian';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

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

const ExpensesTable = props => {
  const { operation } = props;

  const expenses = useSelector(selectExpenses);

  const selectedExpenses = useSelector(state => state.apartments.selectedExpenses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ApartmentsAction.requestAllApartmentExpenses());
  }, [dispatch]);

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    if (event.target.checked)
      dispatch(ApartmentsAction.selectAllExpenses());
    else
      dispatch(ApartmentsAction.resetSelectedExpenses());
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedExpenses.indexOf(id);

    if (selectedIndex === -1)
      dispatch(ApartmentsAction.selectExpense(id));
    else
      dispatch(ApartmentsAction.unselectExpense(id));
  };

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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedExpenses.length === expenses.length}
                      color="primary"
                      indeterminate={
                        selectedExpenses.length > 0 &&
                        selectedExpenses.length < expenses.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell padding="checkbox"/>
                  <TableCell>نام هزینه</TableCell>
                  <TableCell>برای</TableCell>
                  <TableCell>مبلغ</TableCell>
                  <TableCell>تقسیم بر اساس</TableCell>
                  <TableCell>تاریخ ثبت</TableCell>
                  <TableCell>توضیحات</TableCell>
                  {
                    operation && <TableCell>عملیات</TableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.slice(0, rowsPerPage).map(expense => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={expense.id}
                    selected={selectedExpenses.indexOf(expense.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedExpenses.indexOf(expense.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, expense.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div
                        className={classes.nameContainer}
                        style={{
                          backgroundColor: '#' + expense.type.color
                        }}
                      />
                    </TableCell>
                    <TableCell>{expense.type.title}</TableCell>
                    <TableCell>{toPersianNumberWithComma(expense.amount)}</TableCell>
                    <TableCell>{expense.filterOption.title}</TableCell>
                    <TableCell>{expense.splitOption.title}</TableCell>
                    <TableCell>
                      {toPersianNumber(moment(expense.createdAt).locale('fa').format('YYYY/MM/DD'))}
                    </TableCell>
                    <TableCell>{expense.description ? expense.description : '-'}</TableCell>
                    {
                      operation &&
                      <TableCell>
                        <Box
                          component="span"
                          mx={2}
                        >
                          <Button
                            className={classes.button}
                            color="primary"
                            size="small"
                            startIcon={<EditIcon/>}
                            variant="contained"
                          >
                            ویرایش
                          </Button>
                        </Box>
                        <Button
                          className={classes.button}
                          color="secondary"
                          size="small"
                          startIcon={<DeleteIcon/>}
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
          count={expenses.length}
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

ExpensesTable.propTypes = {
  operation: PropTypes.bool.isRequired
};

export default ExpensesTable;
