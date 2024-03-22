import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import HeaderModal from '../HeaderModal';
import CallHistory from './CallHistory';
import Infomation from './Infomation';
import { useGetDetailDataLeads } from 'hooks/leads/useGetDetailDataLeads';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { isEmpty } from 'lodash';
import SimpleBarReact from 'simplebar-react';

const useStyles = makeStyles((theme) => {
  return {};
});

const ContentModal = ({ item, toggle = () => {}, toggleAddCalendar }) => {
  //! State
  const { userInfo } = useAuthentication();
  const role = userInfo?.userRoleDetail?.key || '';
  const classes = useStyles();
  const { t } = useTranslation();

  const listCallHistory = [
    {
      id: 1,
      callDate: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
      callTime: 30000,
      typeCall: 1,
      callFrom: '330',
      callTo: '0981233456',
      record: '',
      note: [
        {
          time: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
          text: 'Khách hàng xấu tính',
        },
        {
          time: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
          text: 'Khách hàng xấu tính',
        },
      ],
    },
    {
      id: 2,
      callDate: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
      callTime: 70000,
      typeCall: 1,
      callFrom: '330',
      callTo: '0981233456',
      record: '',
      note: [
        {
          time: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
          text: 'Khách hàng xấu tính',
        },
        {
          time: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
          text: 'Khách hàng xấu tính',
        },
      ],
    },
    {
      id: 3,
      callDate: 'Fri Apr 12 2022 19:08:55 GMT-0500 (CDT)',
      callTime: 120000,
      typeCall: 1,
      callFrom: '330',
      callTo: '0981233456',
      record: '',
      note: [],
    },
  ];
  //! Function
  const { data, refetch } = useGetDetailDataLeads(item?._id);
  const dataDetail = data?.data?.data;
  if (isEmpty(dataDetail)) return <div>Loading....</div>;
  //! Render
  return (
    // <SimpleBarReact style={{ width: '75vw', maxHeight: '77vh', height: '77vh', overflow: 'hidden' }}>
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Box>
          <HeaderModal title={t('common:contacts_callHistory')} isClose={false} />
          <CallHistory data={listCallHistory} id={item?._id} phoneNumber={item?.phoneNumber} />
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Box>
          <HeaderModal title={t('common:contacts_view')} toggle={toggle} />
          <Infomation
            data={dataDetail}
            role={role}
            refetch={refetch}
            toggleAddCalendar={toggleAddCalendar}
            toggle={toggle}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContentModal;
