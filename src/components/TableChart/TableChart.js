import React from "react";
import { Line } from "react-chartjs-2";

const TableChart = ({ history, color }) => {
  let hourlyChange = 24;
  let newData = [];
  for (let i = 0; i < 7; i++) {
    newData.push(history[hourlyChange * i]);
  }
  const labels = new Array(7).fill("");
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price In USD",
        data: newData,
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
    ],
    borderWidth: 1,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            drawOnChartArea: false,
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
            userCallback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
            userCallback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TableChart;
