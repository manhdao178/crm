import { Chart as ChartJS, registerables } from 'chart.js';
import { useGetReportDashboard } from 'hooks/report/useGetReportDashboard';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables, ChartDataLabels);
ChartJS.defaults.datasets.bar.barThickness = 15;
const ChartTurnover = (props) => {
  //! Define

  const { isSuccess, data } = props;

  const [labelChart, setLabelChart] = useState([]);
  const [valueChart, setValueChart] = useState([]);

  //! Functions

  useEffect(() => {
    const labelGrapList = data?.map((item) => item?.label);
    const valueGrapList = data?.map((item) => item?.value);
    setLabelChart(labelGrapList);
    setValueChart(valueGrapList);
  }, [data]);

  //! Render
  return (
    <Fragment>
      <Bar
        height={200}
        data={{
          labels: labelChart,
          datasets: [
            {
              data: valueChart,
              backgroundColor: '#008638',
              datalabels: {
                color: 'black',
              },
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Doanh số thực tế',
              padding: 30,
              color: '#708090',
              font: {
                size: 20,
                weight: 500,
                family: 'Mulish',
              },
            },
            datalabels: {
              display: false,
            },
          },
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
                offset: true,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </Fragment>
  );
};

export default ChartTurnover;
