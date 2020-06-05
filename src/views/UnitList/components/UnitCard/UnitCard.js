import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import { toPersianMobileNumber, toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch } from 'react-redux';
import * as UnitsAction from '../../../../store/units/UnitsAction';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block'
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardSection: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%'
  },
  cardHalfSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    width: '100%'
  },
  cardRightSection: {
    borderRight: '1px solid #ccc'
  },
  cardDetail: {
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1)
  }
}));

const UnitCard = props => {
  const { className, unit, ...rest } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const cardDetailAlign = 'left';
  const cardDetailVariant = 'body2';

  const getResidentName = unit => {
    if (unit.resident)
      return (unit.resident.firstName ? unit.resident.firstName + ' ' + unit.resident.lastName : 'عدم ثبت نام');
    else
      return 'واحد خالی';
  };

  const handleUnitClick = unit => {
    dispatch(UnitsAction.setFormDialogOpen(true));
    dispatch(UnitsAction.setFormDialogUpdate(true));
    dispatch(UnitsAction.selectUnit(unit));
  };

  return (
    <ButtonBase
      className={clsx(classes.root, className)}
      component="div"
      focusVisibleClassName={classes.focusVisible}
      key={unit.id}
      onClick={() => handleUnitClick(unit)}
    >
      <Card
        {...rest}
        // className={}
      >
        <CardContent className={classes.cardContent}>
          {/*<div className={classes.imageContainer}>*/}
          {/*  <img*/}
          {/*    alt="Product"*/}
          {/*    className={classes.image}*/}
          {/*    src={unit.imageUrl}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className={classes.cardSection}>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
            >
              {unit.title}
            </Typography>
          </div>
          <div className={classes.cardSection}>
            <div className={clsx(classes.cardHalfSection, classes.cardRightSection)}>
              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                طبقه: {toPersianNumber(unit.floor)}
              </Typography>

              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                تعداد ساکنین: {toPersianNumber(unit.residentCount)} نفر
              </Typography>

              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                شارژ ثابت: {toPersianNumberWithComma(unit.fixedCharge)} ریال
              </Typography>
            </div>
            <div className={classes.cardHalfSection}>
              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                متراژ: {toPersianNumberWithComma(unit.area)} متر مربع
              </Typography>

              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                تعداد پارکینگ: {toPersianNumber(unit.parkingSpaceCount)}
              </Typography>

              <Typography
                align={cardDetailAlign}
                className={classes.cardDetail}
                variant={cardDetailVariant}
              >
                وضعیت:{' '}
                <Typography
                  component="span"
                  style={{
                    color: unit.isEmpty ? red[500] : green[600]
                  }}
                  variant={cardDetailVariant}
                >
                  {unit.isEmpty ? 'خالی' : 'پر'}
                </Typography>
              </Typography>
            </div>
          </div>
        </CardContent>
        <Divider/>
        <CardActions>
          <Grid
            container
            justify="space-between"
          >
            <Grid
              className={classes.statsItem}
              item
            >
              <PersonIcon className={classes.statsIcon}/>
              <Typography
                display="inline"
                variant="body2"
              >
                {getResidentName(unit)}
              </Typography>
            </Grid>
            {
              unit.resident &&
              <Grid
                className={classes.statsItem}
                item
              >
                <PhoneEnabledIcon className={classes.statsIcon}/>
                <Typography
                  align="right"
                  dir="ltr"
                  display="inline"
                  variant="body2"
                >
                  {toPersianMobileNumber(unit.resident.mobileNumber)}
                </Typography>
              </Grid>
            }
          </Grid>
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

UnitCard.propTypes = {
  className: PropTypes.string,
  unit: PropTypes.object.isRequired
};

export default UnitCard;
