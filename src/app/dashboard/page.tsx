"use client";
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { FiUsers, FiCalendar, FiDollarSign, FiClock, FiTrendingUp, FiAlertCircle, FiActivity, FiTarget, FiAward, FiTrendingDown, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale);

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

// AI-Powered Predictive Analytics Data
const predictiveData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Actual',
      data: [65, 59, 80, 81, 56, 55, 70],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Predicted',
      data: [null, null, null, null, null, 55, 72],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderDash: [5, 5],
      tension: 0.4,
      fill: true,
    }
  ],
};

// Employee Engagement Metrics
const engagementData = {
  labels: ['Productivity', 'Satisfaction', 'Collaboration', 'Innovation', 'Well-being'],
  datasets: [
    {
      label: 'Current Quarter',
      data: [85, 78, 92, 65, 88],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Previous Quarter',
      data: [75, 70, 85, 60, 80],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
    }
  ],
};

// Skill Gap Analysis
const skillGapData = {
  labels: ['Technical Skills', 'Soft Skills', 'Leadership', 'Innovation', 'Communication'],
  datasets: [
    {
      label: 'Required',
      data: [90, 85, 80, 75, 88],
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderRadius: 5,
    },
    {
      label: 'Current',
      data: [75, 80, 65, 60, 82],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderRadius: 5,
    }
  ],
};

// AI-Generated Insights
const aiInsights = [
  {
    id: 1,
    type: 'success',
    title: 'High Performance Team',
    description: 'Team A shows 25% higher productivity than average. Consider sharing their best practices.',
    icon: <FiAward className="text-green-600" />,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Burnout Risk',
    description: '3 employees showing signs of burnout. Recommend workload adjustment.',
    icon: <FiAlertTriangle className="text-orange-600" />,
  },
  {
    id: 3,
    type: 'info',
    title: 'Skill Development',
    description: 'AI suggests training programs for 5 employees to bridge skill gaps.',
    icon: <FiTarget className="text-blue-600" />,
  },
];

// Quick Actions with AI Recommendations
const quickActions = [
  { 
    id: 1, 
    title: 'Smart Attendance', 
    icon: <FiClock />, 
    color: 'bg-blue-500',
    aiTip: 'Based on patterns, optimal check-in time is 9:15 AM'
  },
  { 
    id: 2, 
    title: 'Leave Predictor', 
    icon: <FiCalendar />, 
    color: 'bg-green-500',
    aiTip: 'AI predicts low leave requests next month'
  },
  { 
    id: 3, 
    title: 'Salary Insights', 
    icon: <FiDollarSign />, 
    color: 'bg-purple-500',
    aiTip: 'Market analysis suggests 8% salary adjustment'
  },
  { 
    id: 4, 
    title: 'Team Analytics', 
    icon: <FiUsers />, 
    color: 'bg-orange-500',
    aiTip: 'Team performance trending up by 15%'
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [showAITips, setShowAITips] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary-600">HR Pulse AI</h2>
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
                <span>AI Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left p-3 flex items-center space-x-3 ${
                  activeTab === 'analytics' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiActivity className="text-lg" />
                <span>Predictive Analytics</span>
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
                <span>Employee Insights</span>
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
                <span>Smart Attendance</span>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI-Powered Dashboard</h1>
              <p className="text-sm text-gray-500">Real-time insights and predictions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAITips(!showAITips)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {showAITips ? 'Hide AI Tips' : 'Show AI Tips'}
              </button>
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
          {/* AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-green-50">
                    {insight.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions with AI Tips */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {quickActions.map((action) => (
              <div key={action.id} className="relative">
                <button
                  className={`${action.color} text-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3 w-full`}
                >
                  {action.icon}
                  <span>{action.title}</span>
                </button>
                {showAITips && (
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-gray-800 text-white text-xs p-2 rounded-lg">
                    {action.aiTip}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Predictive Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Predictive Performance</h2>
              <Line data={predictiveData} options={{
                responsive: true,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += context.parsed.y + '%';
                        }
                        return label;
                      }
                    }
                  }
                },
              }} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Employee Engagement</h2>
              <Radar data={engagementData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                  }
                }
              }} />
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Skill Gap Analysis</h2>
              <Bar data={skillGapData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  }
                }
              }} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">AI Recommendations</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <FiCheckCircle className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Training Program</p>
                    <p className="text-sm text-blue-600">Recommended for 5 employees to improve technical skills</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <FiTrendingUp className="text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Performance Boost</p>
                    <p className="text-sm text-green-600">Team productivity increased by 15% this quarter</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <FiTarget className="text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">Career Path</p>
                    <p className="text-sm text-purple-600">3 employees ready for promotion based on performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 