import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCompass,
  FiCpu,
  FiHome,
  FiMapPin,
  FiPhone,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
  FiMonitor,
  FiClock,
} from 'react-icons/fi';
import { courseImages } from '../assets/illustrations';

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Departments', href: '#departments' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

export const features = [
  {
    title: 'Excellence in Business',
    description:
      'Deliver rigorous, inclusive solutions that prepare employees for meaningful careers and responsible leadership.',
    icon: FiAward,
  },
  {
    title: 'Global Opportunities',
    description:
      'Build a strong foundation for a global career with our comprehensive industry exposure and partnerships.',
    icon: FiGlobe,
  },
  {
    title: 'Modern Infrastructure',
    description:
      'A connected workspace with digital collaboration tools, advanced labs, and employee support spaces.',
    icon: FiMonitor,
  },
  {
    title: 'Career Advancement',
    description:
      'Recognized for strong promotion outcomes, employee projects, technical events, and competitive results.',
    icon: FiTrendingUp,
  },
];

export const departments = [
  {
    title: 'Engineering & Tech',
    description:
      'Focuses on software development, infrastructure, and emerging technologies.',
    image: courseImages.computer,
  },
  {
    title: 'Information Technology',
    description:
      'Manages internal systems, cyber security, and enterprise solutions.',
    image: courseImages.information,
  },
  {
    title: 'Operations & Logistics',
    description:
      'Ensures smooth day-to-day operations and supply chain management.',
    image: courseImages.mechanical,
  },
  {
    title: 'Facilities Management',
    description:
      'Maintains office infrastructure, safety, and physical resources.',
    image: courseImages.civil,
  },
  {
    title: 'Hardware & Electronics',
    description:
      'Develops hardware solutions and electronic systems for our products.',
    image: courseImages.electronics,
  },
  {
    title: 'Human Resources',
    description:
      'Supports employee growth, onboarding, recruitment, and wellness.',
    image: courseImages.business,
  },
];

export const stats = [
  { label: 'Employees', value: '5,000+' },
  { label: 'Departments', value: '25+' },
  { label: 'Global Partners', value: '120+' },
  { label: 'Years of Excellence', value: '30+' },
];

export const contactInfo = [
  { label: 'Address', value: 'XYZ Corp HQ, Business Park, Pune, Maharashtra 411001', icon: FiMapPin },
  { label: 'Phone', value: '+91 20 1234 5678', icon: FiPhone },
  { label: 'Email', value: 'hr@xyzcorp.com', icon: FiBookOpen },
  { label: 'Working Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM', icon: FiClock },
];

export const quickLinks = ['Careers', 'Departments', 'Resources', 'Perks', 'Employee Portal'];

export const socialLinks = [
  { label: 'Academics', icon: FiBookOpen },
  { label: 'Careers', icon: FiBriefcase },
  { label: 'Innovation', icon: FiCpu },
  { label: 'Events', icon: FiStar },
];
