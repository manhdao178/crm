import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { checkInteger } from 'helpers';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';

ChartJS.register(...registerables, ChartDataLabels);

const ScaleGraph = (props) => {
  //! Define
  const { isSuccess, scaleGraphData } = props;

  const [labelChart, setLabelChart] = useState([]);
  const [valueChart, setValueChart] = useState([]);

  //! Functions

  useEffect(() => {
    if (!isSuccess) {
      setLabelChart([]);
      setValueChart([]);
      return;
    }

    if (isEmpty(scaleGraphData)) return;

    const labelGrapList = scaleGraphData?.map((item) => item?.label);
    const valueGrapList = scaleGraphData?.map((item) => checkInteger(item?.value));
    setLabelChart(labelGrapList);
    setValueChart(valueGrapList);
  }, [scaleGraphData]);

  //! Render
  return (
    <Fragment>
      <Chart
        type="line"
        data={{
          labels: labelChart,
          datasets: [
            {
              data: valueChart,
              backgroundColor: 'orange',
              borderColor: 'orange',
            },
          ],
          fill: false,
        }}
        options={{
          scales: {
            x: {
              display: true,
            },
          },

          responsive: true,

          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Daily ratio',
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
        }}
      />
    </Fragment>
  );
};

export default ScaleGraph;
