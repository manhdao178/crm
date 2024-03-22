import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import CallInfo from './CallInfo';
import { useMemo } from 'react';
import moment from 'moment';
import NoteInfo from './NoteInfo';
import { Form, Formik } from 'formik';
import Audio from './Audio';

import { useAddHistoryCallComment } from 'hooks/leads/useAddHistoryCallComment';
import { useCallback } from 'react';
import { showError, showSuccess } from 'helpers/toast';
import { useGetHistoryCallComment } from 'hooks/leads/useGetHistoryCallComment';
import { useEffect } from 'react';
import { useRef } from 'react';
const useStyles = makeStyles((theme) => {
  return {
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      margin: '14px',
      border: '1px solid #F5FBFF',
      borderRadius: '16px',
      boxShadow: '4px 8px 18px 0px #05295f08',
    },
  };
});

const ItemCallHistory = ({ item, phoneNumber }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formikRef = useRef();

  const { mutateAsync: updateNote } = useAddHistoryCallComment();
  const {
    data: comments,
    isLoading: isCommentLoading,
    refetch: refetchComment,
  } = useGetHistoryCallComment(
    {
      leadCall: item?.id,
    },
    { enabled: !!item?.id },
  );

  const dataComments = comments?.data?.data || [];

  const initialValues = useMemo(() => {
    return {
      input: '',
      note: dataComments || [],
    };
  }, [dataComments]);

  const callDate = useMemo(() => {
    if (item?.createdAt) {
      return moment(new Date(item?.callDate)).format('DD/MM/YYYY HH:mm:ss');
    }
    return '';
  }, [item?.createdAt]);

  const typeCall = useMemo(() => {
    if (item?.type) {
      const mockupType = [
        { value: 'outbound', name: 'Gọi ra' },
        { value: 'inbound', name: 'Gọi vào' },
      ];
      const result = mockupType.find((elm) => elm.value === item.type)?.name;
      return result;
    }
    return '';
  }, [item?.typeCall]);
  //! Function
  const handleSubmit = useCallback(
    async (content) => {
      try {
        await updateNote({
          leadCall: item?.id,
          content: content,
        });
        await refetchComment();
        showSuccess(t('common:contacts_addCommentSuccess'));
      } catch (error) {
        showError(t('common:contacts_addCommentFail'));
      }
    },
    [item],
  );

  useEffect(() => {
    if (dataComments && formikRef.current) {
      formikRef.current.resetForm({
        values: {
          input: '',
          note: dataComments || [],
        },
      });
    }
  }, [dataComments]);

  //! Render

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={(values) => {
        handleSubmit(values.input);
      }}
    >
      {({ values, initialValues }) => {
        return (
          <Form>
            <Box className={classes.itemContainer}>
              {/* <Accordion sx={{ boxShadow: 'unset' }}> */}
              {/* <AccordionSummary expandIcon={<CommonIcons.ExpandMore />} sx={{ padding: '0' }}> */}
              <CallInfo
                callDate={callDate}
                callTime={item?.duration}
                callFrom={item?.source}
                callTo={item?.type === 'inbound' ? item?.voipCallDetail?.phone : phoneNumber}
                typeCall={typeCall}
                source={item?.recording}
                billSec={Number(item?.voipCallDetail?.cdrBillSec || 0)}
              />
              {/* </AccordionSummary> */}
              {/* <AccordionDetails> */}
              <Audio source={item?.recording} />
              {/* </AccordionDetails> */}
              {/* <AccordionDetails> */}
              <NoteInfo values={values} />
              {/* </AccordionDetails> */}
              {/* </Accordion> */}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ItemCallHistory;
