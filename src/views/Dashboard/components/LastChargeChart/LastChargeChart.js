import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton, useTheme
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Bar } from 'react-chartjs-2';
import { toPersianNumberWithComma } from '../../../../helpers/persian';

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

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [8000000, 12000000, 20000000],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['قبض آب', 'قبض برق', 'باغبان'].map(label => label.split(' '))
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
        title="هزینه های آخرین شارژ اعلام شده - شارژ خرداد ۹۹"
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
