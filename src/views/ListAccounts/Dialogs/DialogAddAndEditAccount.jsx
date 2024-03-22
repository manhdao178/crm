import React, { Fragment } from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import DatePickerField from 'components/CustomField/DatePickerField';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      fontSize: '20px',
      fontWeight: '700px !important',
      color: `${theme.custom.colors.green}`,
    },
    bottom: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      '& .MuiButtonBase-root': {
        minWidth: '104px',
        padding: '6px ',
      },
    },
    loading: {
      width: '20px !important',
      height: '20px !important',
    },
  };
});

const DialogAddAndEditAccount = ({ open, toggle, onSubmit, item, isLoading }) => {
  //! State
  const { t } = useTranslation();
  const classes = useStyles();
  const initValuesForm = !!item
    ? { adsToday: item.adsToday, adsMonth: item.adsMonth, income: item.income, id: item.id }
    : {
        adsToday: '',
        adsMonth: '',
        income: '',
        id: '',
      };
  const validationSchema = Yup.object().shape({
    adsToday: Yup.string().required(REQUIRED_FIELD(i18n.t('common:account_ads_today'))),
    adsMonth: Yup.string().required(REQUIRED_FIELD(i18n.t('common:account_ads_month'))),
    income: Yup.string().required(REQUIRED_FIELD(i18n.t('common:account_turnover'))),
  });
  //! Function
  const ContentDialog = () => {
    return (
      <Fragment>
        <Formik
          initialValues={initValuesForm}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '700px' }}>
                <Box className={classes.header}>{t('common:addData')}</Box>
                <Field name="adsToday" LabelColorPrimary component={InputField} label={t('common:account_ads_today')} />
                <Field name="adsMonth" LabelColorPrimary component={InputField} label={t('common:account_ads_month')} />
                <Field name="income" LabelColorPrimary component={InputField} label={t('common:account_turnover')} />

                <div className={classes.bottom}>
                  <CommonStyles.Button variant="outlined" onClick={toggle} disabled={isLoading}>
                    {t('common:cancel')}
                  </CommonStyles.Button>
                  <CommonStyles.Button type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress className={classes.loading} /> : t('common:save')}
                  </CommonStyles.Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Fragment>
    );
  };

  //!Render
  return <CommonStyles.Modal open={open} toggle={toggle} content={ContentDialog()} />;
};

export default DialogAddAndEditAccount;
