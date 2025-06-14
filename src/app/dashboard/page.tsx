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
import { Rnd } from 'react-rnd';

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

// Animated Hero Section
function AnimatedHero() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[40vh] md:h-[50vh] mb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 animate-gradient-x opacity-80" />
      <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="0.5" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in">Welcome back, Satyajeet</h1>
        <p className="text-xl text-white/90 animate-fade-in delay-200">Your AI-powered HR command center</p>
      </div>
    </section>
  );
}

// Draggable/Resizable Widget Placeholder
interface CoolWidgetProps {
  title: string;
  children: React.ReactNode;
  defaultPos: { x: number; y: number };
}
function CoolWidget({ title, children, defaultPos }: CoolWidgetProps) {
  return (
    <Rnd
      default={{ x: defaultPos.x, y: defaultPos.y, width: 340, height: 200 }}
      minWidth={220}
      minHeight={120}
      bounds="parent"
      className="rounded-2xl bg-white/60 backdrop-blur-lg shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 cursor-move group"
    >
      <div className="flex flex-col h-full p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{title}</h3>
        <div className="flex-1">{children}</div>
      </div>
    </Rnd>
  );
}

// Floating AI Assistant with Typewriter Effect
function FloatingAIAssistant() {
  const [text, setText] = useState('');
  const fullText = 'Hi! I am your HR AI Assistant. Ask me anything about your team, payroll, or company.';
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-6 w-80 animate-fade-in">
      <div className="flex items-center mb-2">
        <Brain className="w-6 h-6 text-purple-500 mr-2" />
        <span className="font-bold text-gray-900">AI Assistant</span>
      </div>
      <p className="text-gray-700 font-mono min-h-[48px]">{text}<span className="animate-blink">|</span></p>
    </div>
  );
}

// Spotlight Command Bar (Ctrl+K)
interface SpotlightCommandBarProps {
  open: boolean;
  onClose: () => void;
}
function SpotlightCommandBar({ open, onClose }: SpotlightCommandBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  return open ? (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl p-6" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => e.stopPropagation()}>
        <input ref={inputRef} className="w-full p-4 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Type a command or search..." />
        <div className="mt-4 space-y-2">
          <CommandItem icon={Users} title="Go to Employee Directory" />
          <CommandItem icon={Calendar} title="Schedule a Meeting" />
          <CommandItem icon={FileText} title="Create New Report" />
          <CommandItem icon={Settings} title="Open Settings" />
        </div>
      </div>
    </div>
  ) : null;
}

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Core HR');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') setIsCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <AnimatedHero />
      <main className="relative max-w-7xl mx-auto px-4 py-8 min-h-[60vh]">
        {/* Draggable/Resizable Widgets */}
        <div className="relative w-full h-[700px]">
          <CoolWidget title="AI Insights" defaultPos={{ x: 20, y: 20 }}>
            <div className="text-purple-700 font-semibold">AI predicts 8% attrition next quarter. <span className="font-mono">(Click & drag me!)</span></div>
          </CoolWidget>
          <CoolWidget title="Live Org Chart" defaultPos={{ x: 400, y: 40 }}>
            <div className="text-blue-700 font-semibold">Org chart visualization coming soon...</div>
          </CoolWidget>
          <CoolWidget title="Payroll Trends" defaultPos={{ x: 180, y: 250 }}>
            <div className="text-pink-700 font-semibold">Payroll analytics and charts here.</div>
          </CoolWidget>
          <CoolWidget title="Quick Actions" defaultPos={{ x: 600, y: 300 }}>
            <div className="text-green-700 font-semibold">Add employee, process payroll, more...</div>
          </CoolWidget>
        </div>
      </main>
      <FloatingAIAssistant />
      <SpotlightCommandBar open={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
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