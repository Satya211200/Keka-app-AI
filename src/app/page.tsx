"use client";
import React from 'react';
import Link from 'next/link';
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <nav className="flex gap-6 mb-8">
        <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
        <Link href="/auth/login" className="btn btn-secondary">Login</Link>
        <Link href="/auth/register" className="btn btn-secondary">Register</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Welcome to HR Pulse</h1>
      <section className="w-full max-w-2xl mb-8">
        <h2 className="text-xl font-semibold mb-2">Attendance Overview</h2>
        <Line data={attendanceData} />
      </section>
      <section className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
        <Bar data={performanceData} />
      </section>
    </div>
  );
}
