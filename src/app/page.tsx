'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Layout components
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// Section components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamic imports for performance
const ParticleSystem = dynamic(
  () => import('@/components/effects/ParticleSystem'),
  { 
    ssr: false,
    loading: () => null // No loading component for background effects
  }
);

// Hooks
import { useLenis } from '@/hooks/useLenis';


const HomePage: React.FC = () => {
  // Initialize smooth scrolling
  useLenis();

  // Add global error handling for unhandled promise rejections
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Prevent the error from appearing in console as uncaught
      event.preventDefault();
    };

    const handleError = (event: ErrorEvent) => {
      // Prevent the error from appearing in console
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Particle System */}
      <Suspense fallback={null}>
        <ParticleSystem 
          count={800}
          mouseMagnetic={true}
          size={0.03}
          speed={0.8}
        />
      </Suspense>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Services Section */}
          <ServicesSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Contact Section */}
          <ContactSection />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll-based animations and effects would be handled by individual components */}
    </div>
  );
};

export default HomePage;
