import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';

const MainChart = ({ prices }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const closing =
    prices.length > 0
      ? prices.map((item) => {
          return +item.Close;
        })
      : [];
  const dates =
    prices.length > 0
      ? prices.map((item) => {
          return item.Date;
        })
      : [];

  const chartConfig =
    prices.length > 0
      ? {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Closing Price',
                data: closing,
                lineTension: 0,
                fill: false,
                borderColor: 'black',
              },
            ],
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: 'Bitcoin Price Index',
            },
            scales: {
              xAxes: [
                {
                  type: 'time',
                  distribution: 'linear',
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Price in USD',
                  },
                },
              ],
            },
          },
        }
      : {};

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [prices]);

  return (
    <>
      <div></div>
      <div className='chartContainer'>
        <canvas id='chart' ref={chartContainer} />
      </div>
    </>
  );
};

export default MainChart;
