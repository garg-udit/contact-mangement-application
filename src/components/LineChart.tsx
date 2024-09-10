import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

interface LineChartProps {
  historicalData: HistoricalData;
}

const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const dates = Object.keys(historicalData.cases);
  const cases = Object.values(historicalData.cases);
  const deaths = Object.values(historicalData.deaths);
  const recovered = Object.values(historicalData.recovered);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Cases',
        data: cases,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Increased smoothness
        pointRadius: 2, // Smaller points for readability
      },
      {
        label: 'Deaths',
        data: deaths,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        pointRadius: 2,
      },
      {
        label: 'Recovered',
        data: recovered,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true, // Chart will resize based on container size
    maintainAspectRatio: false, // Allows better control of chart size in different layouts
    plugins: {
      title: {
        display: true,
        text: 'COVID-19 Historical Data',
        font: {
          size: 18,
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Cases',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative w-full h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
