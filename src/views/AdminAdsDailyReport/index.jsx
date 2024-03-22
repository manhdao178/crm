import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import useFilters from 'hooks/useFilters';
import useToggleDialog from 'hooks/useToggleDialog';
import { showError, showSuccess } from 'helpers/toast';
import CellItem from './Cell/CellItem';
import { columns } from './columns';
import TotalRow from './totalRow';

const useStyles = makeStyles((theme) => {
  return {};
});

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
};

const AdminAdsDailyReport = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { filters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);

  const data = [
    {
      id: '1',
      orderNumber: '1',
      project: 'Medic Skin',
      branch: 'HN',
      KPI: '70.000.000đ',
      ADSCost: '5.000.000đ',
      schedule: '20',
      success: '16',
      cancel: '10',
      revenue: '50.000.000đ',
      turnover: '210%',
      appreciate: 'Đạt',
    },
    {
      id: '2',
      orderNumber: '2',
      project: 'Medic Skin',
      branch: 'HN',
      KPI: '70.000.000đ',
      ADSCost: '5.000.000đ',
      schedule: '20',
      success: '16',
      cancel: '10',
      revenue: '50.000.000đ',
      turnover: '210%',
      appreciate: 'Đạt',
    },
    {
      id: '3',
      orderNumber: '3',
      project: 'Medic Skin',
      branch: 'HN',
      KPI: '70.000.000đ',
      ADSCost: '5.000.000đ',
      schedule: '20',
      success: '16',
      cancel: '10',
      revenue: '50.000.000đ',
      turnover: '210%',
      appreciate: 'Đạt',
    },
  ];

  //! Function

  //! Render
  return (
    <Formik>
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={data}
                columns={columns}
                rowTotal={<TotalRow />}
                // total={paging?.total}
                // maxPage={paging?.totalPage}
                // hasCheckbox={true}
                handleChangePage={handleChangePage}
                // handleSelect={handleSelect}
                // handleSelectAll={handleSelectAll}
              />
            </CommonStyles.Content>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminAdsDailyReport;
