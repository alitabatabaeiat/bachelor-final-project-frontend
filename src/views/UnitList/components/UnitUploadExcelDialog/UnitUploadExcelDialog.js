import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as UnitsAction from '../../../../store/units/UnitsAction';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileSaver from 'file-saver';
import environment from 'environment';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRowContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formElement: {
    flexGrow: 1,
    flexBasis: 0
  },
  rightFormElement: {
    marginRight: theme.spacing(2)
  },
  submitButton: {
    marginLeft: 'auto'
  },
  leftSubmitButton: {
    marginLeft: theme.spacing(1)
  },
  filename: {
    marginLeft: theme.spacing(2)
  }
}));

const UnitUploadExcelDialog = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  const role = useSelector(state => state.user.role);

  const uploadExcelDialogOpen = useSelector(state => state.units.uploadExcelDialogOpen);

  const handleClose = () => dispatch(UnitsAction.setUploadExcelDialogOpen(false));

  const handleSubmit = () => FileSaver.saveAs(environment.api(role).units().getExcel, 'نمونه.xlsx');

  const handleUploadFile = async () => {
    const data = new FormData();

    data.append('file', selectedFile);

    await dispatch(UnitsAction.requestUploadExcel(data));
    await dispatch(UnitsAction.requestAllUnits());

    await dispatch(UnitsAction.setUploadExcelDialogOpen(false));
  };

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={uploadExcelDialogOpen}
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          ارسال فایل واحدها
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.formRowContainer}>
          <Button
            color="primary"
            component="label"
            variant="contained"
          >
            انتخاب فایل واحد‌ها
            <input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              type="file"
            />
          </Button>
          {/*{*/}
          {/*  selectedFile &&*/}
          {/*    <Typography*/}
          {/*      className={classes.filename}*/}
          {/*      variant="h6"*/}
          {/*    >*/}
          {/*      {selectedFile.name}*/}
          {/*    </Typography>*/}
          {/*}*/}
          {
            selectedFile &&
            <Button
              className={classes.leftSubmitButton}
              color="secondary"
              onClick={handleUploadFile}
              variant="contained"
            >
              بارگذاری '{selectedFile.name}'
            </Button>
          }
          <Button
            className={clsx(classes.submitButton, classes.leftSubmitButton)}
            color="primary"
            onClick={handleSubmit}
            startIcon={<GetAppIcon/>}
            variant="outlined"
          >
            دانلود فایل نمونه
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

UnitUploadExcelDialog.propTypes = {};

export default UnitUploadExcelDialog;
