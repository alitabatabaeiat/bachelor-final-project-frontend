import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ChargeInformationForm } from './components';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { ExpensesTable } from '../ExpenseList/components';
import { toPersianJalaliMonth, toPersianNumber } from '../../helpers/persian';
import moment from 'jalali-moment';
import handleInputChange from '../../helpers/handleInputChange';
import { useDispatch, useSelector } from 'react-redux';
import * as ChargesAction from '../../store/charges/ChargesAction';
import UnitChargesTable from './components/UnitChargesTable';
import validate from '../../helpers/validate';
import { chargeInformationSchema } from './DeclareChargeValidation';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  stepperRoot: {
    backgroundColor: 'transparent'
  }
}));

const now = moment();

const DeclareCharge = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState({
    title: `شارژ ${toPersianJalaliMonth(now.jMonth())} ${toPersianNumber(now.format('jYY'))}`,
    isEmergency: false,
    paymentDeadline: undefined,
    delayPenalty: undefined,
    includeFixedCharge: true,
    description: undefined,
    selectedExpenses: []
  });
  const [errors, setErrors] = React.useState({});


  const selectedExpenses = useSelector(state => state.apartments.selectedExpenses);

  const createdCharge = useSelector(state => state.charges.charge);

  const steps = ['اطلاعات شارژ', 'انتخاب هزینه‌ها', 'اعلام شارژ'];

  const createCharge = async () => {
    const data = {
      ...state,
      expenses: [...selectedExpenses]
    };
    console.log(state);
    console.log(data);
    console.log(selectedExpenses);

    // validation

    await dispatch(ChargesAction.requestCreateCharge(data));
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const errors = validate(chargeInformationSchema, {...state});
      await setErrors({...errors});
      if (errors) return;
    } else if (activeStep === 1) {
      console.log(selectedExpenses.toString());
      await setState({
        ...state,
        selectedExpenses: [...selectedExpenses]
      });
      console.log(state);

      await createCharge();
    }
    await setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = async () => {
    if (activeStep === 1)
      await setState({
        ...state,
        selectedExpenses
      });
    await setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const localHandleInputChange = async (event, options) => await handleInputChange(state, setState, event, options);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={4}
      >
        <Grid
          item
          xs
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.stepperRoot}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid
          container
          item
          justify="center"
          xs
        >
          {
            activeStep === 0 &&
            <Grid
              item
              xs={6}
            >
              <ChargeInformationForm
                onInputChange={localHandleInputChange}
                state={state}
                errors={errors}
              />
            </Grid>
          }
          {
            activeStep === 1 &&
            <Grid
              item
              xs={12}
            >
              <ExpensesTable
                chargeDeclaration
                selectedExpenses={state.selectedExpenses}
              />
            </Grid>
          }
          {
            activeStep === 2 &&
            <UnitChargesTable
              unitCharges={createdCharge.unitCharges}
            />
          }
        </Grid>

        <Grid
          container
          item
          justify="center"
          xs
        >
          <Grid
            container
            item
            justify={activeStep === 0 ? 'flex-end' : activeStep === 1 ? 'space-between' : 'flex-start'}
            xs={9}
          >
            {
              activeStep === 1 &&
              <Button
                className={classes.submitButton}
                color="secondary"
                onClick={handleBack}
                variant="contained"
              >
                قبلی
              </Button>
            }
            {
              activeStep < 2 &&
              <Button
                className={clsx(classes.submitButton, classes.leftSubmitButton)}
                color="primary"
                onClick={handleNext}
                variant="contained"
              >
                {activeStep === 1 ? 'اعلام شارژ' : 'بعدی'}
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeclareCharge;
