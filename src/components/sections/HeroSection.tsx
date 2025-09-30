'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Gamepad2, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/layout/Section';
import { useMousePosition } from '@/hooks/useMousePosition';
import { scrollToElement } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const mousePosition = useMousePosition();
  const [currentRole, setCurrentRole] = useState(0);
  
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

  // Parallax effect calculations
  const parallaxX = typeof window !== 'undefined' 
    ? (mousePosition.x - window.innerWidth / 2) * 0.02 
    : 0;
  const parallaxY = typeof window !== 'undefined' 
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
            x: typeof window !== 'undefined' ? parallaxX * 8 : 0,
            y: typeof window !== 'undefined' ? parallaxY * 8 : 0,
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
            x: typeof window !== 'undefined' ? -parallaxX * 6 : 0,
            y: typeof window !== 'undefined' ? -parallaxY * 6 : 0,
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
            x: typeof window !== 'undefined' ? parallaxX * 3 : 0,
            y: typeof window !== 'undefined' ? parallaxY * 3 : 0,
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
          Hello, I&apos;m <strong className="text-white">Sky Tomlinson</strong>
        </motion.p>
        
        <motion.p
          className="text-md md:text-lg text-gray-400 mb-2"
          variants={itemVariants}
        >
          also known as
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
          Now I'm channeling that energy into Discord kingdoms and UEFN magic that transforms how creators connect and create.
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
            <MessageCircle className="w-6 h-6" />
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
            <Gamepad2 className="w-6 h-6" />
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
