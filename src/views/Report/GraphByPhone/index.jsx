import { Chart as ChartJS, registerables } from 'chart.js';
import { useGetReportDashboard } from 'hooks/report/useGetReportDashboard';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables, ChartDataLabels);
const GraphByPhone = (props) => {
  //! Define
  const { phoneGraphData, isSuccess } = props;

  const [labelChart, setLabelChart] = useState([]);
  const [valueChart, setValueChart] = useState([]);

  //! Functions

  useEffect(() => {
    if (!isSuccess) {
      setLabelChart([]);
      setValueChart([]);
      return;
    }

    if (isEmpty(phoneGraphData)) return;

    const labelGrapList = phoneGraphData?.map((item) => item?.label);
    const valueGrapList = phoneGraphData?.map((item) => item?.value);
    setLabelChart(labelGrapList);
    setValueChart(valueGrapList);
  }, [phoneGraphData]);

  //! Render
  return (
    <Fragment>
      <Bar
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
              text: 'Daily phone number',
              padding: 30,
            },
            datalabels: {
              align: 'end',
              anchor: 'end',
              color: function (context) {
                return context.dataset.backgroundColor;
              },
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
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
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

export default GraphByPhone;
