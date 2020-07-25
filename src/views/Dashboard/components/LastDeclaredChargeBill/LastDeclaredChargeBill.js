import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button, Grid, colors
} from '@material-ui/core';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { useSelector } from 'react-redux';
import red from '@material-ui/core/colors/red';
import moment from 'jalali-moment';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  detailBox: {
    height: 75,
    backgroundColor: colors.grey[100],
    marginBottom: theme.spacing(2)
  },
  boxTitle: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  boxValue: {
    paddingLeft: theme.spacing(2)
  }
}));

const LastDeclaredChargeBill = props => {
  const { className, ...rest } = props;

  const lastCharge = useSelector(state => state.charges.unitLastCharge);

  const history = useHistory();

  const classes = useStyles();

  const handleGoToBillClick = () => {
    history.push('/unit-bills');
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={`صورتحساب من${lastCharge ? ' - ' + lastCharge.charge.title : ''}`}
      />
      <Divider/>
      <CardContent>
        {
          lastCharge &&
          <Grid
            container
            spacing={4}
          >
            <Grid
              container
              direction="column"
              item
              sm={6}
              xs={12}
            >
              <Grid
                className={classes.detailBox}
                item
              >
                <Typography
                  className={classes.boxTitle}
                  variant="h6"
                >
                  مبلغ
                </Typography>
                <Typography
                  className={classes.boxValue}
                  variant="h4"
                >
                  {toPersianNumberWithComma(lastCharge.amount) + ' ریال'}
                </Typography>
              </Grid>

              <Grid
                className={classes.detailBox}
                item
              >
                <Typography
                  className={classes.boxTitle}
                  variant="h6"
                >
                  وضعیت
                </Typography>
                <Typography
                  className={classes.boxValue}
                  style={{color: lastCharge.isPaid ? green[500] : red[500]}}
                  variant="h4"
                >
                  {lastCharge.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              item
              sm={6}
              xs={12}
            >
              <Grid
                className={classes.detailBox}
                item
              >
                <Typography
                  className={classes.boxTitle}
                  variant="h6"
                >
                  تاریخ ثبت
                </Typography>
                <Typography
                  className={classes.boxValue}
                  variant="h4"
                >
                  {toPersianNumber(moment(lastCharge.createdAt).locale('fa').format('YYYY/MM/DD'))}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              item
              sm={12}
              xs={12}
            >
              <Button
                color="primary"
                onClick={handleGoToBillClick}
                size="small"
                startIcon={<ReceiptIcon/>}
                variant="outlined"
              >
                برو به صفحه صورتحساب
              </Button>
            </Grid>
          </Grid>
        }
      </CardContent>
      <Divider/>
      <CardActions className={classes.actions}>
        {/*<Button*/}
        {/*  color="primary"*/}
        {/*  size="small"*/}
        {/*  variant="text"*/}
        {/*>*/}
        {/*  Overview <ArrowRightIcon />*/}
        {/*</Button>*/}
      </CardActions>
    </Card>
  );
};

LastDeclaredChargeBill.propTypes = {
  className: PropTypes.string
};

export default LastDeclaredChargeBill;
