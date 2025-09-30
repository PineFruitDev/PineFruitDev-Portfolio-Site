/**
 * Common interface definitions for the portfolio website
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'game' | 'discord-bot' | 'discord-server' | 'other';
  createdAt?: Date;
  isNDA?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  popular?: boolean;
}

export interface TestimonialTag {
  name: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  tags?: TestimonialTag[];
  accentColor?: 'blue' | 'purple' | 'green' | 'cyan' | 'pink' | 'yellow' | 'red' | 'indigo';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5 or 1-100
  icon?: string;
  experience?: string; // e.g., "2+ years"
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down';
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormResponse extends ApiResponse {
  data?: {
    messageId: string;
    timestamp: Date;
  };
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  fullHeight?: boolean;
  background?: 'default' | 'gradient' | 'transparent';
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Three.js related types
export interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  mouseMagnetic?: boolean;
}
