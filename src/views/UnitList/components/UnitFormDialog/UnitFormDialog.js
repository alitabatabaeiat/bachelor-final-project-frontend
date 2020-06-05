import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import UnitForm from './UnitForm';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as UnitsAction from '../../../../store/units/UnitsAction';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  }
}));

const UnitFormDialog = props => {

  const dispatch = useDispatch();

  const units = useSelector(state => state.units);

  const handleClose = () => dispatch(UnitsAction.setFormDialogOpen(false));

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={units.formDialogOpen}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          ایجاد واحد
        </Typography>
      </DialogTitle>
      <DialogContent>
        <UnitForm />
      </DialogContent>
    </Dialog>
  );
};

UnitFormDialog.propTypes = {
};

export default UnitFormDialog;
