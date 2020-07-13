import React from 'react';
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
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { toEnglishNumberWithoutComma, toPersianNumber, toPersianNumberWithComma } from '../../../../helpers/persian';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Expenses = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = React.useState({
    residentCountStep: undefined,
    parkingSpaceCountStep: undefined,
    areaStep: undefined,
  });

  const [errors, setErrors] = React.useState({});

  const handleAmountChange = async event => {
    const { name, value } = event.target;
    const amount = toEnglishNumberWithoutComma(value)
    await setState({
      ...state,
      [name]: amount
    });
  };

  const hasError = (errors, name) => errors && errors[name];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="تنظیمات هزینه‌ها را مدیریت کن"
          title="هزینه‌ها"
        />
        <Divider />
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
              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'residentCountStep')}
                helperText={hasError(errors, 'residentCountStep') ? errors.residentCountStep.message : 'میزان گام به ازای هر ساکن را وارد کنید'}
                inputProps={{
                  name: 'residentCountStep'
                }}
                label="گام تعداد ساکنین"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.residentCountStep)}
                variant="outlined"
              />

              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'parkingSpaceCountStep')}
                helperText={hasError(errors, 'parkingSpaceCountStep') ? errors.parkingSpaceCountStep.message : 'میزان گام به ازای هر پارکینگ را وارد کنید'}
                inputProps={{
                  name: 'parkingSpaceCountStep'
                }}
                label="گام تعداد پارکینگ"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.parkingSpaceCountStep)}
                variant="outlined"
              />

              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'floorStep')}
                helperText={hasError(errors, 'floorStep') ? errors.floorStep.message : 'میزان گام به ازای هر طبقه را وارد کنید'}
                inputProps={{
                  name: 'floorStep'
                }}
                label="گام طبقه"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.floorStep)}
                variant="outlined"
              />

              <TextField
                className={clsx(classes.formElement, classes.rightFormElement)}
                error={hasError(errors, 'areaStep')}
                helperText={hasError(errors, 'areaStep') ? errors.areaStep.message : 'میزان گام به ازای هر متر از واحد را وارد کنید'}
                inputProps={{
                  name: 'areaStep'
                }}
                label="گام متراژ"
                margin="dense"
                onChange={handleAmountChange}
                required
                value={toPersianNumber(state.areaStep)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            style={{
              marginRight: 'auto'
            }}
          >
            ذخیره
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
