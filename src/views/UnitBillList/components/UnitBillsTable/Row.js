import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import moment from 'jalali-moment';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
  nameContainer: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
});

function Row(props) {
  let { charge, rowNumber } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const role = useSelector(state => state.user.role);
  console.log(charge)

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell>{toPersianNumber(rowNumber)}</TableCell>
        <TableCell>{role === 'resident' ? charge.title : charge.unit.title}</TableCell>
        <TableCell>{toPersianNumberWithComma(charge.amount) + ' ریال'}</TableCell>
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
        <TableCell>
          {
            charge.includeFixedCharge ? toPersianNumberWithComma(charge.unit.fixedCharge) + ' ریال' : '-'
          }
        </TableCell>
        <TableCell>
          {toPersianNumber(moment(charge.createdAt).locale('fa').format('YYYY/MM/DD'))}
        </TableCell>
        {
          role === 'manager' &&
          <TableCell>
            <Button
              className={classes.button}
              color="primary"
              size="small"
              variant="contained"
            >
              پرداخت
            </Button>
          </TableCell>
        }
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={7}
          style={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Typography
                component="div"
                gutterBottom
                variant="h6"
              >
                هزینه‌ها
              </Typography>
              <Table
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"/>
                    <TableCell>عنوان هزینه</TableCell>
                    <TableCell>مبلغ</TableCell>
                    <TableCell>برای</TableCell>
                    <TableCell>تقسیم بر اساس</TableCell>
                    <TableCell>تاریخ ثبت</TableCell>
                    <TableCell>توضیحات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charge.expenses.map(expense => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div
                          className={classes.nameContainer}
                          style={{
                            backgroundColor: '#' + expense.type.color
                          }}
                        />
                      </TableCell>
                      <TableCell>{expense.type.title}</TableCell>
                      <TableCell>{toPersianNumberWithComma(expense.amount) + ' ریال'}</TableCell>
                      <TableCell>{expense.filterOption.title}</TableCell>
                      <TableCell>{expense.splitOption.title}</TableCell>
                      <TableCell>
                        {toPersianNumber(moment(expense.createdAt).locale('fa').format('YYYY/MM/DD'))}
                      </TableCell>
                      <TableCell>{expense.description ? expense.description : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  // row: PropTypes.shape({
  //   calories: PropTypes.number.isRequired,
  //   carbs: PropTypes.number.isRequired,
  //   fat: PropTypes.number.isRequired,
  //   history: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       amount: PropTypes.number.isRequired,
  //       customerId: PropTypes.string.isRequired,
  //       date: PropTypes.string.isRequired
  //     })
  //   ).isRequired,
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  //   protein: PropTypes.number.isRequired
  // }).isRequired
  charge: PropTypes.object.isRequired,
  rowNumber: PropTypes.number.isRequired
};

export default Row;
