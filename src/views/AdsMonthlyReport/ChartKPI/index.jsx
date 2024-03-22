import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartKPI = (props) => {
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

  const options = {
    chart: {
      type: 'areaspline',
      height: '300px',
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    xAxis: {
      categories: labelChart,
      startOnTick: true,
      tickmarkPlacement: 'on',
      style: {
        fontFamily: 'Mulish',
        fontSize: '30px',
      },
    },
    tooltip: {
      backgroundColor: '#333',
      borderRadius: 20,
      followPointer: false,
      style: {
        color: '#fff',
      },
    },
    title: {
      text: 'KPI',
      style: {
        color: '#708090',
        fontSize: '20px',
        fontFamily: 'Mulish',
      },
    },
    credits: {
      text: '',
    },
    series: [
      {
        name: 'KPI',
        color: '#008638',
        data: valueChart,
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartKPI;
