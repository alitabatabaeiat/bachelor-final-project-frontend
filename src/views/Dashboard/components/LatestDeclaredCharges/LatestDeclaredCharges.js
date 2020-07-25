import React, { useEffect } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { toPersianNumberWithComma } from '../../../../helpers/persian';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  noCharge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 350
  }
}));

const LatestDeclaredCharges = props => {
  const { className, ...rest } = props;

  const latestCharges = useSelector(state => state.charges.apartmentCharges);

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: _.chain(latestCharges).clone().reverse().map(charge => charge.totalAmount).value(),
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
    labels: _.chain(latestCharges).clone().reverse().map(charge => charge.title.split(' ')).value()
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
      rtl: true,
      enabled: false,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
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
        // action={
        //   <IconButton size="small">
        //     <RefreshIcon />
        //   </IconButton>
        // }
        title="آخرین شارژهای اعلامی"
      />
      <Divider/>
      <CardContent>
        <div className={classes.noCharge}>
          {
            latestCharges.length > 0 &&
            <Bar
              data={data}
              height={50}
              options={options}
              width={100}
            />
          }
          {
            latestCharges.length === 0 &&
            <Typography variant="h5">تا به حال شارژی اعلام نشده است</Typography>
          }
        </div>
      </CardContent>
    </Card>
  );
};

LatestDeclaredCharges.propTypes = {
  className: PropTypes.string
};

export default LatestDeclaredCharges;
