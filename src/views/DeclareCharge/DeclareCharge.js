import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StartChargeDeclarationForm, SelectExpensesForm } from './components';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { ExpensesTable } from '../ExpenseList/components';
import { toEnglishNumberWithoutComma } from '../../helpers/persian';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  stepperRoot: {
    backgroundColor: 'transparent'
  }
}));

const DeclareCharge = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [startFormState, setStartFormState] = React.useState({
    title: undefined,
    paymentDeadline: undefined,
    delayPenalty: undefined
  });

  const steps = ['شروع', 'انتخاب هزینه‌ها', 'اعلام شارژ'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = async (event, isNumber = false) => {
    const { name, value } = event.target;
    await setStartFormState({
      ...startFormState,
      [name]: isNumber ? toEnglishNumberWithoutComma(value) : value
    });
  };

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
              <StartChargeDeclarationForm
                onInputChange={handleInputChange}
                state={startFormState}
              />
            </Grid>
          }
          {
            activeStep === 1 &&
            <Grid
              item
              xs={12}
            >
              <ExpensesTable operation={false}/>
            </Grid>
          }
          {
            activeStep === 2 && <StartChargeDeclarationForm/>
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
              activeStep > 0 &&
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
                بعدی
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeclareCharge;
