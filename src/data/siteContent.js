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
  FiUsers,
} from 'react-icons/fi';
import { courseImages } from '../assets/illustrations';

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact', href: '#contact' },
];

export const aboutCards = [
  {
    title: 'Mission',
    description:
      'Deliver rigorous, inclusive education that prepares students for meaningful careers and responsible citizenship.',
    icon: FiTarget,
  },
  {
    title: 'Vision',
    description:
      'Build a future-ready academic community known for innovation, ethics, research, and industry collaboration.',
    icon: FiCompass,
  },
  {
    title: 'Campus Overview',
    description:
      'A connected learning environment with digital classrooms, advanced labs, library access, and student support spaces.',
    icon: FiHome,
  },
  {
    title: 'Achievements',
    description:
      'Recognized for strong placement outcomes, student projects, technical events, and competitive academic results.',
    icon: FiAward,
  },
];

export const courses = [
  {
    title: 'Computer Engineering',
    description: 'Software development, data structures, cloud systems, databases, and modern computing foundations.',
    image: courseImages.computer,
  },
  {
    title: 'Information Technology',
    description: 'Networks, cybersecurity, web platforms, analytics, enterprise systems, and applied IT operations.',
    image: courseImages.information,
  },
  {
    title: 'Mechanical Engineering',
    description: 'Design, manufacturing, thermodynamics, robotics, CAD tools, and practical engineering workshops.',
    image: courseImages.mechanical,
  },
  {
    title: 'Civil Engineering',
    description: 'Structural design, surveying, sustainable construction, transportation, and infrastructure planning.',
    image: courseImages.civil,
  },
  {
    title: 'Electronics Engineering',
    description: 'Embedded systems, circuits, communication, IoT, instrumentation, and hands-on electronics labs.',
    image: courseImages.electronics,
  },
];

export const admissionItems = [
  {
    title: 'Admission Process',
    description: 'Apply online, submit documents, attend counseling, and confirm your seat after verification.',
    icon: FiCheckCircle,
  },
  {
    title: 'Eligibility',
    description: 'Applicants should meet board, entrance, and category requirements published for the academic year.',
    icon: FiUsers,
  },
  {
    title: 'Important Dates',
    description: 'Application windows, merit lists, counseling rounds, and fee deadlines are updated regularly.',
    icon: FiCalendar,
  },
];

export const stats = [
  { label: 'Students', value: '5,000+' },
  { label: 'Programs', value: '25+' },
  { label: 'Placement Partners', value: '120+' },
  { label: 'Years of Excellence', value: '30+' },
];

export const contactDetails = [
  { label: 'Address', value: 'XYZ College Campus, Knowledge Park, Pune, Maharashtra 411001', icon: FiMapPin },
  { label: 'Phone', value: '+91 98765 43210', icon: FiPhone },
  { label: 'Email', value: 'admissions@xyzcollege.edu', icon: FiBookOpen },
];

export const quickLinks = ['Admissions', 'Departments', 'Library', 'Placements', 'Student Portal'];

export const socialLinks = [
  { label: 'Academics', icon: FiBookOpen },
  { label: 'Careers', icon: FiBriefcase },
  { label: 'Innovation', icon: FiCpu },
  { label: 'Events', icon: FiStar },
];
