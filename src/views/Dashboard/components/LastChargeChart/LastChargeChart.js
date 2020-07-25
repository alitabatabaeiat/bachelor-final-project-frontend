import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  useTheme
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { toPersianNumberWithComma } from '../../../../helpers/persian';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  }
}));

const LastChargeChart = props => {
  const { className, ...rest } = props;

  const lastCharge = useSelector(state => state.charges.unitLastCharge);
  const expenses = lastCharge ? lastCharge.charge.expenses : null;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: _.map(expenses, expense => expense.unitExpenses[0].amount),
        backgroundColor: _.map(expenses, expense => '#' + expense.type.color),
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: _.map(expenses, expense => expense.type.title).map(label => label.split(' '))
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
      enabled: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(label) {
            return toPersianNumberWithComma(label) + ' ریال';
          }
        }
      }]
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={`هزینه های آخرین شارژ اعلام شده${lastCharge ? ' - ' + lastCharge.charge.title : ''}`}
      />
      <Divider/>
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            height={50}
            options={options}
            width={100}
          />
        </div>
      </CardContent>
      <Divider/>
      <CardActions>
        {/*<Button*/}
        {/*  color="primary"*/}
        {/*  size="small"*/}
        {/*  variant="text"*/}
        {/*>*/}
        {/*  View all <ArrowRightIcon />*/}
        {/*</Button>*/}
      </CardActions>
    </Card>
  );
};

LastChargeChart.propTypes = {
  className: PropTypes.string
};

export default LastChargeChart;
