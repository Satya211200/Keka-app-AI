import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const attendanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Attendance',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const performanceData = {
  labels: ['Employee A', 'Employee B', 'Employee C', 'Employee D', 'Employee E'],
  datasets: [
    {
      label: 'Performance Score',
      data: [85, 90, 75, 88, 92],
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
  ],
};

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Attendance Overview</h2>
        <Line data={attendanceData} />
      </section>
      <section>
        <h2>Performance Metrics</h2>
        <Bar data={performanceData} />
      </section>
    </div>
  );
} 