import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';

const MainChart = ({ prices }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [daysToDisplay, setDaysToDisplay] = useState(30);

  const beginDate = prices.length - daysToDisplay;
  const endDate = prices.length;

  const closing =
    prices.length > 0
      ? prices.slice(beginDate, endDate).map((item) => {
          return +item.Close;
        })
      : [];
  const dates =
    prices.length > 0
      ? prices.slice(beginDate, endDate).map((item) => {
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
            events: null,
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
                    display: false,
                    labelString: 'Date',
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
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
  }, [prices, daysToDisplay]);

  const handleDateChange = (days) => {
    setDaysToDisplay(days);
  };

  return (
    <>
      <h2>Historical Chart</h2>
      <div>
        <button onClick={() => handleDateChange(90)}>3M</button>
        <button onClick={() => handleDateChange(180)}>6M</button>
        <button onClick={() => handleDateChange(360)}>1Y</button>
        <button onClick={() => handleDateChange(720)}>2Y</button>
        <button onClick={() => handleDateChange(1800)}>5Y</button>
      </div>
      <div className='chartContainer'>
        <canvas id='chart' ref={chartContainer} />
      </div>
    </>
  );
};

export default MainChart;
