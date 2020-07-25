import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import { toPersianNumber } from '../../../../helpers/persian';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const ExpensesSeparation = props => {
  const { className, ...rest } = props;

  const _selectExpenses = expenses => {
    let _expenses = _.chain(expenses).groupBy('type.title').mapValues(item => ({
      title: item[0].type.title,
      amount: _.sumBy(item, 'amount'),
      color: item[0].type.color
    })).values().sortBy('amount').value();
    const sum = _.sumBy(_expenses, 'amount');
    return _.map(_expenses, expense => ({
      ...expense,
      percent: (expense.amount / sum * 100).toFixed(0)
    }));
  };

  const expenses = useSelector(createSelector(state => state.apartments.expenses, _selectExpenses));
  console.log(expenses);

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: _.map(expenses, 'amount'),
        backgroundColor: _.map(expenses, expense => '#' + expense.color),
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: _.map(expenses, 'title')
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'آب',
      value: '63',
      icon: <LaptopMacIcon/>,
      color: theme.palette.primary.main
    },
    {
      title: 'برق',
      value: '15',
      icon: <TabletMacIcon/>,
      color: theme.palette.error.main
    },
    {
      title: 'گاز',
      value: '23',
      icon: <PhoneIphoneIcon/>,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <IconButton size="small">
        //     <RefreshIcon />
        //   </IconButton>
        // }
        title="هزینه‌ها به تفکیک نوع"
      />
      <Divider/>
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {expenses.map(expense => (
            <div
              className={classes.device}
              key={expense.title}
            >
              {/*<span className={classes.deviceIcon}>{device.icon}</span>*/}
              <Typography variant="body1">{expense.title}</Typography>
              <Typography
                style={{ color: '#' + expense.color }}
                variant="h2"
              >
                {toPersianNumber(expense.percent)}٪
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ExpensesSeparation.propTypes = {
  className: PropTypes.string
};

export default ExpensesSeparation;
