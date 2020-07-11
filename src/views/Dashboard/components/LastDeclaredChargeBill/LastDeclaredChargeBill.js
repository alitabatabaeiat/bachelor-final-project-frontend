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
import { toPersianNumberWithComma } from '../../../../helpers/persian';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import green from '@material-ui/core/colors/green';
import ReceiptIcon from '@material-ui/icons/Receipt';

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

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={'صورتحساب من - شارژ خرداد ۹۹'}
      />
      <Divider/>
      <CardContent>
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
                {toPersianNumberWithComma(15000000) + ' ریال'}
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
                اضطراری
              </Typography>
              <Typography
                className={classes.boxValue}
                variant="h4"
              >
                <DoneIcon
                  fontSize="small"
                  style={{ color: green[500] }}
                />
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
                ۱۳۹۹/۰۳/۱۸
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
              size="small"
              startIcon={<ReceiptIcon />}
              variant="outlined"
            >
              برو به صفحه صورتحساب
            </Button>
          </Grid>
        </Grid>
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
