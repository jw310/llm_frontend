import { useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  'Eating',
  'Drinking',
  'Sleeping',
  'Designing',
  'Coding',
  'Cycling',
  'Running',
];

export default function RadarChart({ isExecute }) {
  const dataArray = [29, 48, 40, 19, 96, 27, 100];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Radar Chart',
        data: dataArray,
        // backgroundColor: 'rgba(221, 169, 35, 1)',
        backgroundColor: ({ chart: { ctx } }) => {
          const x = ctx.canvas.height * 0.65;
          const y = ctx.canvas.width * 0.25;
          const outerRadius = ctx.canvas.width / 3.2;

          const x1 = x * 1.49;
          const y1 = y * 0.87;

          const gradient = ctx.createRadialGradient(
            x,
            y,
            outerRadius,
            x1,
            y1,
            200
          );
          gradient.addColorStop(0, 'rgba(221, 169, 35, 1)');
          gradient.addColorStop(1, 'white');

          // // More config for your gradient
          // const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          // gradient.addColorStop(0, 'rgba(221, 169, 35, 1)');
          // // bg.addColorStop(0.5, 'rgba(221, 169, 35, 0.5)');
          // gradient.addColorStop(1, 'rgba(221, 169, 35, 0)');
          // ctx.fillStyle = bg;
          // let x0 = 100;
          // let y0 = 100;
          // let w = 500;
          // let h = 300;
          // ctx.fillRect(x0, y0, w, h);
          return gradient;
        },
        borderColor: 'rgba(221, 169, 35, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(221, 169, 35, 1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      // 上方 data label 隱藏
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: '%',
        align: 'start',
        color: '#CED2DA',
        font: {
          size: 14,
          family: 'sans-serif',
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      r: {
        // 旋轉角度
        startAngle: 0,
        angleLines: {
          color: '#949EAE',
          lineWidth: 0.5,
        },
        // x 邊型
        grid: {
          color: '#949EAE',
          circular: false,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'sans-serif',
          },
          color: '#CED2DA',
        },
        // Data value
        ticks: {
          display: false,
          stepSize: 10,
          backdropColor: '#1B2839',
          color: '#CED2DA',
          showLabelBackdrop: false,
        },
      },
    },
    // result
    elements: {
      point: {
        radius: 5,
      },
    },
  };

  useEffect(() => {
    if (!isExecute) return;

    // const interval = setInterval(() => {
    //   // 資料更新邏輯
    // }, 10000);
    // return () => clearInterval(interval);
  }, [isExecute]);

  return (
    <div className='h-[350px] w-full'>
      <Radar data={chartData} options={chartOptions} redraw={false} />
    </div>
  );
}
