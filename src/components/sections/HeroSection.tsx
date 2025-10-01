'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, MessageCircle, Twitter } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/layout/Section';
import { useMousePosition } from '@/hooks/useMousePosition';
import { scrollToElement } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const mousePosition = useMousePosition();
  const [currentRole, setCurrentRole] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const roles = [
    'Contract Engineer',
    'Full Stack Developer', 
    'Game Development Expert',
    'Discord Specialist',
    'Your new best friend?',
  ];

  // Auto-rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effect calculations - only active after hydration
  const parallaxX = mounted && typeof window !== 'undefined'
    ? (mousePosition.x - window.innerWidth / 2) * 0.02
    : 0;
  const parallaxY = mounted && typeof window !== 'undefined'
    ? (mousePosition.y - window.innerHeight / 2) * 0.02
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <Section 
      id="hero" 
      fullHeight 
      background="gradient" 
      className="flex items-center justify-center relative overflow-hidden"
    >
      {/* Interactive Background Orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Primary purple orb - moves toward mouse */}
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: mounted ? parallaxX * 8 : 0,
            y: mounted ? parallaxY * 8 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{
            top: '25%',
            left: '25%',
          }}
        />
        
        {/* Secondary blue orb - moves away from mouse */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: mounted ? -parallaxX * 6 : 0,
            y: mounted ? -parallaxY * 6 : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          style={{
            bottom: '25%',
            right: '25%',
          }}
        />
        
        {/* Central cyan orb - subtle mouse interaction + pulse */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: mounted ? parallaxX * 3 : 0,
            y: mounted ? parallaxY * 3 : 0,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 60, damping: 20 },
            y: { type: "spring", stiffness: 60, damping: 20 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          className="text-lg md:text-xl text-purple-400 mb-4 font-medium"
          variants={itemVariants}
        >
          Hello, I&apos;m <strong className="text-white">Sky Tomlinson</strong>, <span className="text-purple-400">also known as:</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="gradient-text text-glow">
            PineFruit
          </span>
          <span className="text-white">Dev</span>
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div
          className="h-16 md:h-20 flex items-center justify-center mb-8"
          variants={itemVariants}
        >
          <motion.h2
            key={currentRole}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRole]}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-6xl mx-auto"
          variants={itemVariants}
        >
          Six years of startup chaos taught me to ship fast, pivot faster, and keep users hooked.
          <br className="hidden md:block" />
          Now I'm channeling that energy into Discord kingdoms and UEFN magic
          <br className="hidden md:block" />
          that transforms how creators connect and create.
        </motion.p>

        {/* Call-to-action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <Button
            size="lg"
            onClick={() => scrollToElement('projects')}
            icon={<Code className="w-5 h-5" />}
            className="text-lg px-8 py-4"
          >
            View My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToElement('contact')}
            icon={<Mail className="w-5 h-5" />}
            className="text-lg px-8 py-4"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mb-16"
          variants={itemVariants}
        >
          <motion.a
            href="https://discord.com/users/227292400307929088"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0789.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0789-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0067.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0408.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9758 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
            </svg>
          </motion.a>
          
          <motion.a
            href="https://github.com/PineFruitDev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/pinefruitdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          
          <motion.a
            href="https://twitter.com/PineFruitDev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
            </svg>
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Floating code symbols */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-500/20 text-2xl font-mono"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {['{ }', '< >', '[ ]', '( )', '/>', '{}'][i]}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default HeroSection;
