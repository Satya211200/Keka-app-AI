"use client";
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiUsers, FiCalendar, FiDollarSign, FiClock, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// Interactive data with hover effects
const attendanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Present',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Absent',
      data: [5, 8, 3, 2, 4, 6, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: true,
    }
  ],
};

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Team Performance',
      data: [85, 90, 75, 88, 92, 95],
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderRadius: 5,
    },
  ],
};

const leaveBalanceData = {
  labels: ['Used', 'Remaining'],
  datasets: [
    {
      data: [7, 13],
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      borderWidth: 0,
    },
  ],
};

const recentActivities = [
  { id: 1, action: 'New employee joined', time: '2 hours ago', type: 'join' },
  { id: 2, action: 'Leave request approved', time: '5 hours ago', type: 'leave' },
  { id: 3, action: 'Payroll processed', time: '1 day ago', type: 'payroll' },
  { id: 4, action: 'Performance review completed', time: '2 days ago', type: 'review' },
];

const quickActions = [
  { id: 1, title: 'Mark Attendance', icon: <FiClock />, color: 'bg-blue-500' },
  { id: 2, title: 'Apply Leave', icon: <FiCalendar />, color: 'bg-green-500' },
  { id: 3, title: 'View Payslip', icon: <FiDollarSign />, color: 'bg-purple-500' },
  { id: 4, title: 'Team Overview', icon: <FiUsers />, color: 'bg-orange-500' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary-600">HR Pulse</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left p-3 flex items-center space-x-3 ${
                  activeTab === 'overview' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiTrendingUp className="text-lg" />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('employees')}
                className={`w-full text-left p-3 flex items-center space-x-3 ${
                  activeTab === 'employees' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiUsers className="text-lg" />
                <span>Employees</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`w-full text-left p-3 flex items-center space-x-3 ${
                  activeTab === 'attendance' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiCalendar className="text-lg" />
                <span>Attendance</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('payroll')}
                className={`w-full text-left p-3 flex items-center space-x-3 ${
                  activeTab === 'payroll' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiDollarSign className="text-lg" />
                <span>Payroll</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <FiAlertCircle className="text-xl" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`${action.color} text-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3`}
              >
                {action.icon}
                <span>{action.title}</span>
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Employees</p>
                  <p className="text-2xl font-bold">150</p>
                </div>
                <FiUsers className="text-2xl text-primary-600" />
              </div>
              <p className="text-green-500 text-sm mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Present Today</p>
                  <p className="text-2xl font-bold">142</p>
                </div>
                <FiCalendar className="text-2xl text-green-600" />
              </div>
              <p className="text-green-500 text-sm mt-2">95% attendance rate</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">On Leave</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <FiClock className="text-2xl text-orange-600" />
              </div>
              <p className="text-orange-500 text-sm mt-2">5% of workforce</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Tasks</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FiAlertCircle className="text-2xl text-red-600" />
              </div>
              <p className="text-red-500 text-sm mt-2">3 high priority</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
              <Line data={attendanceData} options={{
                responsive: true,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
              <Bar data={performanceData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} />
            </div>
          </div>

          {/* Recent Activity and Leave Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'join' ? 'bg-green-100' :
                      activity.type === 'leave' ? 'bg-blue-100' :
                      activity.type === 'payroll' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {activity.type === 'join' ? <FiUsers className="text-green-600" /> :
                       activity.type === 'leave' ? <FiCalendar className="text-blue-600" /> :
                       activity.type === 'payroll' ? <FiDollarSign className="text-purple-600" /> :
                       <FiTrendingUp className="text-orange-600" />}
                    </div>
                    <div>
                      <p className="text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Leave Balance</h2>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48">
                  <Doughnut data={leaveBalanceData} options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }} />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">Total Leave Balance: 20 days</p>
                <p className="text-sm text-gray-500">Next leave cycle starts in 3 months</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 