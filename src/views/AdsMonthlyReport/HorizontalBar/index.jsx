import { Chart as ChartJS, registerables } from 'chart.js';
import { useGetReportDashboard } from 'hooks/report/useGetReportDashboard';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import CustomField from 'components/CustomField';
import moment from 'moment';

ChartJS.register(...registerables, ChartDataLabels);
const HorizonBar = (props) => {
  //! Define

  const { filter, setFilter, data: dataRes } = props;

  const options = {
    aspectRatio: 5,
    indexAxis: 'y',
    yAxis: {
      title: {
        text: '',
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chi phí ADS',
        // padding: 30,
        fontSize: '18px',
      },
      datalabels: {
        align: 'center',
        anchor: 'center',
        color: '#fff',
        font: function (context) {
          const w = context.chart.width;
          return {
            size: w < 512 ? 12 : 14,
            weight: 'bold',
          };
        },
        formatter: function (value, context) {
          return context.chart.data[context.dataIndex];
        },
      },
    },
  };
  const labels = [''];

  const data = {
    labels,
    datasets: [
      {
        barThickness: 40,
        label: 'Doanh thu',
        data: dataRes?.totalIncome.toString(),
        backgroundColor: '#008638',
      },
      {
        barThickness: 40,
        label: 'Chi phí ADS',
        data: dataRes?.totalAmountSpent.toString(),
        backgroundColor: '#ccc',
      },
    ],
  };

  //! Functions

  //! Render
  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
        <Box sx={{ fontSize: '20px', fontWeight: '600', color: '#708090' }}>Chi phí ADS</Box>
        <Box>
          <Formik initialValues={{}}>
            {(propsFormik) => {
              return (
                <Form>
                  <Field
                    component={CustomField.DateField}
                    onChange={(date) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          date: date,
                        };
                      });
                    }}
                    value={filter.date}
                    label={''}
                    name="date"
                  />
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
      <Bar options={options} data={data} />
    </Fragment>
  );
};

export default HorizonBar;
