import React, { useEffect } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
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
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  }
}));

const LatestDeclaredCharges = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [8000000, 55000000, 40000000],
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
    labels: ['شارژ اضطراری تعمیر آسانسور', 'شارژ اردیبهشت ۹۹', 'شارژ خرداد ۹۹'].map(label => label.split(' '))
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
      footerFontColor: theme.palette.text.secondary,
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
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            height={50}
            options={options}
            width={100}
          />
        </div>
        {/*<div className={classes.stats}>*/}
        {/*  {devices.map(device => (*/}
        {/*    <div*/}
        {/*      className={classes.device}*/}
        {/*      key={device.title}*/}
        {/*    >*/}
        {/*      <span className={classes.deviceIcon}>{device.icon}</span>*/}
        {/*      <Typography variant="body1">{device.title}</Typography>*/}
        {/*      <Typography*/}
        {/*        style={{ color: device.color }}*/}
        {/*        variant="h2"*/}
        {/*      >*/}
        {/*        {toPersianNumber(device.value)}٪*/}
        {/*      </Typography>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  );
};

LatestDeclaredCharges.propTypes = {
  className: PropTypes.string
};

export default LatestDeclaredCharges;
