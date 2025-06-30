import { useState, useEffect } from 'react';

import {
  // 先 import 要使用的圖形、功能
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip, // 滑鼠在數據區域上的提示顯示
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // pie, doughnut
  Title,
  Legend,
  Filler, // background fill
  Colors,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { getGPUStatusById } from '@/actions/actions';

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Title,
  Legend,
  Filler,
  Colors
);

const arrayLength = 13;
const xAxisLabels = [
  '00:10',
  '00:20',
  '00:30',
  '00:40',
  '00:50',
  '01:00',
  '01:10',
  '01:20',
  '01:30',
  '01:40',
  '01:50',
  '02:00',
  '02:10',
];

export default function LineChart({ isExecute }) {
  // const [dataArray, setDataArray] = useState([0]);

  const dataArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const chartData = {
    labels: xAxisLabels,
    datasets: [
      {
        // backgroundColor: 'rgba(221, 169, 35, 1)',
        backgroundColor: ({ chart: { ctx } }) => {
          // More config for your gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, 'rgba(221, 169, 35, 1)');
          // // bg.addColorStop(0.5, 'rgba(221, 169, 35, 0.5)');
          gradient.addColorStop(1, 'rgba(221, 169, 35, 0)');
          // ctx.fillStyle = bg;
          // let x0 = 100;
          // let y0 = 100;
          // let w = 500;
          // let h = 300;
          // ctx.fillRect(x0, y0, w, h);

          return gradient;
        },
        fill: true, // backgroundColor fill
        label: 'Line Chart',
        data: dataArray,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        lineTension: 0.5,
        pointBackgroundColor: '#DDA923',
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'x', // ˊ主軸線
    responsive: true,
    maintainAspectRatio: false, // 圖表是否維持固定比例，關了才能自定義寬高
    layout: {
      padding: 20,
    },
    plugins: {
      colors: {
        // 內建顏色套件
        enabled: false,
      },
      legend: {
        // 資料標籤
        display: false,
        position: 'top',
        align: 'center',
        boxWidth: 80,
        labels: {
          font: {
            size: 16,
            family: 'sans-serif',
            style: 'italic',
          },
        },
      },
      title: {
        display: true,
        position: 'top',
        align: 'start',
        text: '%',
        font: {
          size: 14,
          family: 'sans-serif',
        },
        color: '#CED2DA',
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          align: 'end',
          text: 'Time',
          font: {
            size: 14,
            family: 'sans-serif',
          },
          color: '#CED2DA',
        },
        ticks: {
          font: {
            size: 16,
            family: 'sans-serif',
            style: 'italic',
          },
          color: '#CED2DA',
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        min: 0, // 最小值
        max: 100, // 最大值
        ticks: {
          stepSize: 10, // 間隔為10
          font: {
            size: 16,
            family: 'sans-serif',
            style: 'italic',
          },
          color: '#CED2DA',
          textStrokeColor: '#205EA4',
          backdropColor: '#1B2839',
          padding: 15,
        },
        border: {
          dash: [6, 4],
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          color: '#949EAE',
          lineWidth: 0.5,
        },
      },
    },
    animation: true,
  };

  useEffect(() => {
    if (!isExecute) return;

    // const interval = setInterval(async () => {
    //   // const { gpuUsagePercent } = await getGPUStatusById(orderId);
    //   // setDataArray((prev) => {
    //   //   if (prev.length === arrayLength) {
    //   //     const newArray = prev.slice(1);
    //   //     return [...newArray, gpuUsagePercent];
    //   //   } else {
    //   //     return [...prev, gpuUsagePercent];
    //   //   }
    //   // });
    // }, 10000);

    // return () => clearInterval(interval);
  }, [isExecute]);

  return (
    <div className='h-[350px] w-full'>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
