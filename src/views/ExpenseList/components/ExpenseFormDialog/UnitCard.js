import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper/Paper';
import { Typography } from '@material-ui/core';
import { toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

const useStyle = makeStyles(theme => ({
  unitButton: {
    margin: theme.spacing(1)
  },
  unit: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
    padding: theme.spacing(1)
  },
  unitCoefficient: {
    maxWidth: 100
  }
}));

const UnitCard = props => {
  const { unit, coefficients, splitOption, onUnitClick, onCoefficientChange } = props;

  const classes = useStyle();

  const getUnitSplitOptionValue = () => {
    switch (splitOption) {
      case 2:
        return `تعداد ساکنین: ${toPersianNumber(unit.residentCount)}`;
      case 3:
        return `تعداد پارکینگ‌ها: ${toPersianNumber(unit.parkingSpaceCount)}`;
      case 4:
        return `مساحت: ${toPersianNumberWithComma(unit.area)}`;
      case 5:
        return `طبقه: ${toPersianNumber(unit.floor)}`;
      case 7:
        return `ضریب مصرف: ${toPersianNumber(unit.suggestedConsumptionCoefficient ? unit.suggestedConsumptionCoefficient : unit.consumptionCoefficient)}`;
      case 8:
        return `تعداد ساکنین: ${toPersianNumber(unit.residentCount)} طبقه: ${toPersianNumber(unit.floor)}`;
      default:
        return null;
    }
  };

  return (
    <ButtonBase
      className={classes.unitButton}
      focusVisibleClassName={classes.focusVisible}
      onClick={(event) => onUnitClick(event, unit.id)}
    >
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        badgeContent={
          unit.selected ?
            <CheckCircleIcon
              color="primary"
              fontSize="small"
            /> : false
        }
      >
        <Paper className={classes.unit}>
          <Typography variant="body1">
            طبقه {toPersianNumber(unit.floor)} - {unit.title}
          </Typography>
          <Typography variant="caption">
            {unit.resident ? `${unit.resident.firstName ?? 'ساکن ثبت نام نکرده'} ${unit.resident.lastName ?? ''}` : 'واحد خالی'}
          </Typography>
          {
            <Typography variant="caption">
              {getUnitSplitOptionValue()}
            </Typography>
          }
          {
            splitOption === 6 &&
            <TextField
              className={classes.unitCoefficient}
              disabled={!unit.selected}
              inputProps={{
                name: unit.id
              }}
              label="ضریب"
              margin="dense"
              onChange={onCoefficientChange}
              size="small"
              value={toPersianNumber(coefficients[unit.id])}
              variant="outlined"
            />
          }
        </Paper>
      </Badge>
    </ButtonBase>
  );
};

UnitCard.propTypes = {
  coefficients: PropTypes.array,
  onCoefficientChange: PropTypes.func.isRequired,
  onUnitClick: PropTypes.func.isRequired,
  splitOption: PropTypes.number,
  unit: PropTypes.object.isRequired
};

export default UnitCard;
