import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box, Grid } from '@mui/material';
import TextAreaField from 'components/CustomField/TextAreaField';
import { Field, FieldArray } from 'formik';
import InputField from 'components/CustomField/InputField';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
  return {
    inputField: {
      height: '49px !important',
    },
    btnSave: {
      display: 'flex-end',
      justifyContent: 'flex-end',
    },
    renderData: {
      position: 'relative',
    },
    renderTime: {
      position: 'absolute',
      fontSize: '12px',
      right: '15px',
      bottom: 0,
      display: 'flex',
      gap: '12px',
    },
  };
});

const NoteInfo = ({ values }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  //! Function

  //! Render
  return (
    <FieldArray
      name="note"
      render={(arrayValues) => (
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Field
              className={classes.inputField}
              component={TextAreaField}
              name="input"
              placeholder={t('common:contacts_placeholder_note')}
            />
          </Grid>
          <Grid className={classes.btnSave} item xs={2}>
            <CommonStyles.Button type="submit" style={{ background: '#2886CF' }}>
              {t('common:save')}
            </CommonStyles.Button>
          </Grid>
          {/*  */}
          {values.note.map((itemNote, index) => (
            <Grid className={classes.renderData} item xs={12} key={itemNote.id} mt={2}>
              <Field
                disabled
                // className={classes.noteValues}
                sx={{ paddingBottom: '20px' }}
                component={TextAreaField}
                name={`note[${index}].content`}
              />
              <span className={classes.renderTime}>
                <div>{itemNote?.authorDetail?.fullname}</div>
                {itemNote.createdAt && moment(new Date(itemNote.createdAt)).format('DD/MM/YYYY HH:mm:ss')}
              </span>
            </Grid>
          ))}
        </Grid>
      )}
    />
  );
};

export default NoteInfo;
