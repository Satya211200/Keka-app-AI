"use client";
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { FiUsers, FiCalendar, FiDollarSign, FiClock, FiTrendingUp, FiAlertCircle, FiActivity, FiTarget, FiAward, FiTrendingDown, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import type { DraggableProvided, DraggableStateSnapshot, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useDarkMode } from '@/components/DarkModeProvider';
import { io, Socket } from 'socket.io-client';
import { PaperAirplaneIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, FileText, DollarSign, 
  BarChart2, PieChart, Bell, Search,
  Settings, HelpCircle, MessageSquare,
  ChevronDown, ChevronRight, Plus,
  Clock, Award, Briefcase, Mail,
  Shield, Zap, Star, TrendingUp,
  BookOpen, Target, Heart, ShieldCheck,
  Building, CreditCard, FileCheck, Users2,
  BarChart, LineChart, PieChart as PieChartIcon,
  Activity, Zap as ZapIcon, Brain, Rocket,
  Globe, Lock, Key, Database, Server,
  Code, Terminal, Box, Package, Truck,
  Home, Map, Navigation, Compass,
  Menu
} from 'lucide-react';

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

// Apple-inspired color palette
const applePalette = {
  background: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
  card: 'bg-white/90 backdrop-blur-lg',
  border: 'border border-gray-200',
  shadow: 'shadow-xl',
  accent: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300',
};

// Navigation items with nested sections
const navigationItems = [
  {
    title: 'Core HR',
    icon: Users,
    items: [
      { name: 'Employee Directory', href: '/employees' },
      { name: 'Onboarding', href: '/onboarding' },
      { name: 'Offboarding', href: '/offboarding' },
      { name: 'Document Management', href: '/documents' },
      { name: 'Employee Profiles', href: '/profiles' },
      { name: 'Workforce Planning', href: '/workforce-planning' },
    ]
  },
  {
    title: 'Time & Attendance',
    icon: Clock,
    items: [
      { name: 'Time Tracking', href: '/time-tracking' },
      { name: 'Attendance', href: '/attendance' },
      { name: 'Leave Management', href: '/leave' },
      { name: 'Shift Management', href: '/shifts' },
      { name: 'Overtime Tracking', href: '/overtime' },
      { name: 'Schedule Optimization', href: '/schedule-optimization' },
    ]
  },
  {
    title: 'Payroll & Benefits',
    icon: DollarSign,
    items: [
      { name: 'Payroll Processing', href: '/payroll' },
      { name: 'Benefits Admin', href: '/benefits' },
      { name: 'Compensation', href: '/compensation' },
      { name: 'Tax Management', href: '/tax' },
      { name: 'Expense Management', href: '/expenses' },
      { name: 'Budget Planning', href: '/budget' },
    ]
  },
  {
    title: 'Performance',
    icon: TrendingUp,
    items: [
      { name: 'Performance Reviews', href: '/reviews' },
      { name: 'Goals & OKRs', href: '/goals' },
      { name: 'Feedback', href: '/feedback' },
      { name: 'Learning & Development', href: '/learning' },
      { name: 'Career Planning', href: '/career-planning' },
      { name: 'Succession Planning', href: '/succession' },
    ]
  },
  {
    title: 'Recruitment',
    icon: Briefcase,
    items: [
      { name: 'Job Postings', href: '/jobs' },
      { name: 'Candidates', href: '/candidates' },
      { name: 'Interviews', href: '/interviews' },
      { name: 'Offer Management', href: '/offers' },
      { name: 'Talent Pipeline', href: '/talent-pipeline' },
      { name: 'Recruitment Analytics', href: '/recruitment-analytics' },
    ]
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    items: [
      { name: 'HR Metrics', href: '/metrics' },
      { name: 'Reports', href: '/reports' },
      { name: 'Dashboards', href: '/dashboards' },
      { name: 'Forecasting', href: '/forecasting' },
      { name: 'Predictive Analytics', href: '/predictive' },
      { name: 'Custom Reports', href: '/custom-reports' },
    ]
  },
  {
    title: 'Learning & Development',
    icon: BookOpen,
    items: [
      { name: 'Training Programs', href: '/training' },
      { name: 'Course Catalog', href: '/courses' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Skills Matrix', href: '/skills' },
      { name: 'Learning Paths', href: '/learning-paths' },
      { name: 'Knowledge Base', href: '/knowledge-base' },
    ]
  },
  {
    title: 'Compliance & Risk',
    icon: ShieldCheck,
    items: [
      { name: 'Policy Management', href: '/policies' },
      { name: 'Compliance Tracking', href: '/compliance' },
      { name: 'Risk Assessment', href: '/risk' },
      { name: 'Audit Management', href: '/audits' },
      { name: 'Incident Reports', href: '/incidents' },
      { name: 'Regulatory Updates', href: '/regulatory' },
    ]
  },
  {
    title: 'Employee Engagement',
    icon: Heart,
    items: [
      { name: 'Surveys', href: '/surveys' },
      { name: 'Pulse Checks', href: '/pulse' },
      { name: 'Recognition', href: '/recognition' },
      { name: 'Wellness Programs', href: '/wellness' },
      { name: 'Social Feed', href: '/social' },
      { name: 'Team Building', href: '/team-building' },
    ]
  },
  {
    title: 'Resource Management',
    icon: Building,
    items: [
      { name: 'Asset Tracking', href: '/assets' },
      { name: 'Equipment Management', href: '/equipment' },
      { name: 'Facility Management', href: '/facilities' },
      { name: 'IT Resources', href: '/it-resources' },
      { name: 'Vendor Management', href: '/vendors' },
      { name: 'Inventory Control', href: '/inventory' },
    ]
  },
  {
    title: 'Project Management',
    icon: Target,
    items: [
      { name: 'Project Tracking', href: '/projects' },
      { name: 'Task Management', href: '/tasks' },
      { name: 'Resource Allocation', href: '/resource-allocation' },
      { name: 'Timeline Planning', href: '/timelines' },
      { name: 'Project Analytics', href: '/project-analytics' },
      { name: 'Collaboration Tools', href: '/collaboration' },
    ]
  },
  {
    title: 'AI & Automation',
    icon: Brain,
    items: [
      { name: 'AI Insights', href: '/ai-insights' },
      { name: 'Process Automation', href: '/automation' },
      { name: 'Smart Scheduling', href: '/smart-scheduling' },
      { name: 'Predictive Analytics', href: '/predictive' },
      { name: 'Chatbots', href: '/chatbots' },
      { name: 'Workflow Automation', href: '/workflows' },
    ]
  }
];

// AI-powered quick actions
const aiQuickActions = [
  { 
    id: 1, 
    title: 'Smart Attendance', 
    icon: Clock,
    color: 'bg-gray-500',
    aiTip: 'Based on patterns, optimal check-in time is 9:15 AM'
  },
  { 
    id: 2, 
    title: 'Leave Predictor', 
    icon: Calendar,
    color: 'bg-gray-500',
    aiTip: 'AI predicts low leave requests next month'
  },
  { 
    id: 3, 
    title: 'Salary Insights', 
    icon: DollarSign,
    color: 'bg-gray-500',
    aiTip: 'Market analysis suggests 8% salary adjustment'
  },
  { 
    id: 4, 
    title: 'Team Analytics', 
    icon: Users,
    color: 'bg-gray-500',
    aiTip: 'Team performance trending up by 15%'
  },
  {
    id: 5,
    title: 'Resource Optimization',
    icon: Zap,
    color: 'bg-gray-500',
    aiTip: 'AI suggests optimal resource allocation'
  },
  {
    id: 6,
    title: 'Compliance Check',
    icon: Shield,
    color: 'bg-gray-500',
    aiTip: 'All policies up to date'
  }
];

// Quick actions for common tasks
const commonQuickActions = [
  { name: 'Add Employee', icon: Plus, href: '/employees/new' },
  { name: 'Process Payroll', icon: DollarSign, href: '/payroll/process' },
  { name: 'Schedule Interview', icon: Calendar, href: '/interviews/schedule' },
  { name: 'Create Report', icon: FileText, href: '/reports/new' },
  { name: 'Assign Training', icon: BookOpen, href: '/training/assign' },
  { name: 'Update Policies', icon: Shield, href: '/policies/update' }
];

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Core HR');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-colors duration-700`}>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">HR Pulse</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <Search className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">⌘K</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 space-y-4">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => setActiveSection(section.title)}
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  activeSection === section.title ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <section.icon className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-900">{section.title}</span>
                </div>
                {activeSection === section.title ? (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                )}
              </button>
              {activeSection === section.title && (
                <div className="mt-2 ml-6 space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Welcome back, Satyajeet</h2>
            <p className="text-gray-600">Here's what's happening in your organization today.</p>
          </section>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'analytics', 'tasks', 'reports', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* AI Quick Actions */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">AI Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiQuickActions.map((action) => (
                <div
                  key={action.id}
                  className={`p-6 rounded-xl bg-white border border-gray-200 shadow-xl hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{action.aiTip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {commonQuickActions.map((action) => (
                <button
                  key={action.name}
                  className={`p-4 rounded-xl bg-white border border-gray-200 shadow-xl hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="w-6 h-6 text-gray-700" />
                    <span className="text-gray-900">{action.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Key Metrics */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard
                title="Total Employees"
                value="1,234"
                change="+12%"
                icon={Users}
              />
              <MetricCard
                title="Active Projects"
                value="45"
                change="+5%"
                icon={Briefcase}
              />
              <MetricCard
                title="Open Positions"
                value="23"
                change="-3%"
                icon={Award}
              />
              <MetricCard
                title="Training Hours"
                value="1,234"
                change="+8%"
                icon={Star}
              />
            </div>
          </section>

          {/* Advanced Analytics */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-xl">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Employee Distribution</h4>
                {/* Add your chart component here */}
              </div>
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-xl">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Performance Trends</h4>
                {/* Add your chart component here */}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Activity</h3>
            <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-xl">
              <div className="space-y-4">
                <ActivityItem
                  icon={Users}
                  title="New Employee Onboarded"
                  description="John Doe joined the Engineering team"
                  time="2 hours ago"
                />
                <ActivityItem
                  icon={Calendar}
                  title="Team Meeting Scheduled"
                  description="Quarterly review with the Product team"
                  time="4 hours ago"
                />
                <ActivityItem
                  icon={Award}
                  title="Performance Review Completed"
                  description="Sarah Smith's annual review was submitted"
                  time="1 day ago"
                />
              </div>
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Upcoming Events</h3>
            <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-xl">
              <div className="space-y-4">
                <EventItem
                  title="Team Building Workshop"
                  date="Tomorrow, 10:00 AM"
                  location="Conference Room A"
                />
                <EventItem
                  title="New Hire Orientation"
                  date="Mar 15, 9:00 AM"
                  location="Training Room"
                />
                <EventItem
                  title="Leadership Meeting"
                  date="Mar 16, 2:00 PM"
                  location="Board Room"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCommandPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-2xl mx-auto mt-20 p-4"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xl">
                <input
                  type="text"
                  placeholder="Search or type a command..."
                  className="w-full p-4 text-lg bg-transparent border-none focus:outline-none text-gray-900"
                  autoFocus
                />
                <div className="mt-4 space-y-2">
                  <CommandItem icon={Users} title="Go to Employee Directory" />
                  <CommandItem icon={Calendar} title="Schedule a Meeting" />
                  <CommandItem icon={FileText} title="Create New Report" />
                  <CommandItem icon={Settings} title="Open Settings" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Component for metric cards
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  return (
    <div className={`p-6 rounded-xl ${applePalette.card} ${applePalette.border} ${applePalette.shadow}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6" />
        <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <h4 className="text-2xl font-bold mb-1">{value}</h4>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}

// Component for activity items
interface ActivityItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
}

function ActivityItem({ icon: Icon, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
}

// Component for event items
interface EventItemProps {
  title: string;
  date: string;
  location: string;
}

function EventItem({ title, date, location }: EventItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-gray-100">
        <Calendar className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}

// Component for command items
interface CommandItemProps {
  icon: React.ElementType;
  title: string;
}

function CommandItem({ icon: Icon, title }: CommandItemProps) {
  return (
    <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </button>
  );
} 