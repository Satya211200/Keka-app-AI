"use client";
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

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

const companyPerformanceData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Revenue',
      data: [100, 120, 140, 160],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

const genderRatioData = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
    },
  ],
};

const recentActivities = [
  { id: 1, action: 'New employee joined', time: '2 hours ago' },
  { id: 2, action: 'Leave request approved', time: '5 hours ago' },
  { id: 3, action: 'Payroll processed', time: '1 day ago' },
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary-600">HR Pulse</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li><a href="/dashboard" className="block p-2 text-gray-700 hover:bg-gray-100">Dashboard</a></li>
            <li><a href="/employees" className="block p-2 text-gray-700 hover:bg-gray-100">Employees</a></li>
            <li><a href="/attendance" className="block p-2 text-gray-700 hover:bg-gray-100">Attendance</a></li>
            <li><a href="/leaves" className="block p-2 text-gray-700 hover:bg-gray-100">Leaves</a></li>
            <li><a href="/payroll" className="block p-2 text-gray-700 hover:bg-gray-100">Payroll</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to HR Pulse</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
            <Line data={attendanceData} />
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <Bar data={performanceData} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Company Performance</h2>
            <Line data={companyPerformanceData} />
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Gender Ratio</h2>
            <Pie data={genderRatioData} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-gray-600">Total Employees: 50</p>
            <p className="text-gray-600">Active Projects: 5</p>
            <p className="text-gray-600">Pending Tasks: 12</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="text-gray-600">
                  {activity.action} - <span className="text-gray-400">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary">Quick Action</button>
        </div>
      </main>
    </div>
  );
} 