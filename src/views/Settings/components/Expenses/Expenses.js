import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { toEnglishNumberWithoutComma, toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';
import { useDispatch, useSelector } from 'react-redux';
import * as ApartmentsAction from '../../../../store/apartments/ApartmentsAction';
import _ from 'lodash';
import validate from '../../../../helpers/validate';
import { updateApartmentSettingSchema } from './ExpensesValidation';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  formElement: {
    marginBottom: theme.spacing(2)
  }
}));

const Expenses = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const setting = useSelector(state => state.apartments.setting);

  const [state, setState] = React.useState({
    residentCountStep: '',
    parkingSpaceCountStep: '',
    areaStep: '',
    floorStep: ''
  });

  const [errors, setErrors] = React.useState({});


  useEffect(() => {
    dispatch(ApartmentsAction.requestApartmentSetting());
  }, []);

  const handleAmountChange = async event => {
    const { name, value } = event.target;
    const amount = toEnglishNumberWithoutComma(value);
    await setState({
      ...state,
      [name]: amount
    });
  };

  const handleSubmit = async () => {
    const data = {
      residentCountStep: state.residentCountStep ? state.residentCountStep : undefined,
      parkingSpaceCountStep: state.parkingSpaceCountStep ? state.parkingSpaceCountStep : undefined,
      areaStep: state.areaStep ? state.areaStep : undefined,
      floorStep: state.floorStep ? state.floorStep : undefined
    };

    const errors = validate(updateApartmentSettingSchema, data);
    setErrors(errors);
    if (!errors) {
      await dispatch(ApartmentsAction.requestUpdateApartmentSetting(data));
      setState({
        residentCountStep: '',
        parkingSpaceCountStep: '',
        areaStep: '',
        floorStep: ''
      });
    }
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="?????????????? ????????????????? ???? ???????????? ????"
          title="?????????????????"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              xs={12}
            >
              <Typography variant="caption">{`?????????? ????????: ${toPersianNumber(setting.residentCountStep)}`}</Typography>
              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'residentCountStep')}
                helperText={hasError(errors, 'residentCountStep') ? errors.residentCountStep.message : '?????????? ?????? ???? ???????? ???? ???????? ???? ???????? ????????'}
                inputProps={{
                  name: 'residentCountStep'
                }}
                label="?????? ?????????? ????????????"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.residentCountStep)}
                variant="outlined"
              />

              <Typography variant="caption">{`?????????? ????????: ${toPersianNumber(setting.parkingSpaceCountStep)}`}</Typography>
              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'parkingSpaceCountStep')}
                helperText={hasError(errors, 'parkingSpaceCountStep') ? errors.parkingSpaceCountStep.message : '?????????? ?????? ???? ???????? ???? ?????????????? ???? ???????? ????????'}
                inputProps={{
                  name: 'parkingSpaceCountStep'
                }}
                label="?????? ?????????? ??????????????"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.parkingSpaceCountStep)}
                variant="outlined"
              />

              <Typography variant="caption">{`?????????? ????????: ${toPersianNumber(setting.areaStep)}`}</Typography>
              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'areaStep')}
                helperText={hasError(errors, 'areaStep') ? errors.areaStep.message : '?????????? ?????? ???? ???????? ???? ?????? ???? ???????? ???? ???????? ????????'}
                inputProps={{
                  name: 'areaStep'
                }}
                label="?????? ??????????"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.areaStep)}
                variant="outlined"
              />

              <Typography variant="caption">{`?????????? ????????: ${toPersianNumber(setting.floorStep)}`}</Typography>
              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'floorStep')}
                helperText={hasError(errors, 'floorStep') ? errors.floorStep.message : '?????????? ?????? ???? ???????? ???? ???????? ???? ???????? ????????'}
                inputProps={{
                  name: 'floorStep'
                }}
                label="?????? ????????"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.floorStep)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <CardActions>
          <Button
            color="primary"
            onClick={handleSubmit}
            style={{
              marginRight: 'auto'
            }}
            variant="outlined"
          >
            ??????????
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Expenses.propTypes = {
  className: PropTypes.string
};

export default Expenses;
