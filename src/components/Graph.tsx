import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Graph = ({ data }) => {
  // Assuming your data array is an array of arrays with format [[timestamp, value], ...]
  const labels = data.map(item => item[0]);
  const dataSet = data.map(item => item[1]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Stock Value',
        data: dataSet,
        borderColor: 'blue',
        borderWidth: 1,
        pointRadius: 0, // Hides data points
        tension: 0.4 // Smoothes the line
      }
    ]
  };

  const options = {
    scales: {
      x: { display: false }, // Hides X-axis labels
      y: { display: false }  // Hides Y-axis labels
    },
    plugins: {
      legend: { display: false }, // Hides the legend
      tooltip: { enabled: false }  // Disables tooltips
    },
    maintainAspectRatio: false // Allows custom aspect ratio
  };

  return (
    <div style={{ height: '28px', width: '48px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
