'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Gamepad2, Bot, Zap, Users } from 'lucide-react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
// import { SkillCategory } from '@/types';

const AboutSection: React.FC = () => {
  /*
  const projectStats = [
    {
      category: 'Current Projects Progress',
      items: [
        { name: 'Portfolio Website', progress: 85, description: 'Almost there!' },
        { name: 'NDA Game Project', progress: 60, description: 'Ongoing development' },
        { name: 'Discord Bot Rewrite', progress: 40, description: 'Major refactor in progress' },
        { name: 'Open Source Contributions', progress: 30, description: 'Always growing' },
      ],
    },
    {
      category: 'Learning & Growth',
      items: [
        { name: 'Advanced Verse Techniques', progress: 75, description: 'Pushing the boundaries' },
        { name: 'Modern React Patterns', progress: 65, description: 'Staying current' },
        { name: 'System Design Mastery', progress: 55, description: 'Continuous improvement' },
        { name: 'Coffee Brewing Skills', progress: 95, description: 'Nearly perfected' },
      ],
    },
  ];
  */

  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Contract Engineering',
      description: 'Multi-project approach spanning AAA game development, web platforms, and community systems.',
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'UEFN & Verse Specialist', 
      description: 'Building next-generation Fortnite experiences and coaching creators since Verse launch.',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Discord Ecosystem Architect',
      description: 'Serving 50+ communities with enterprise-grade automation and custom bot solutions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community & Mentorship',
      description: 'Empowering developers through knowledge sharing, code reviews, and technical guidance.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section id="about" background="gradient">
      <Section.Header
        subtitle="Get to know me"
        title="PineFruit"
        description="Creating digital experiences that users love and businesses depend on"
      />

      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        {/* Bio Section */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div 
            variants={itemVariants} 
            className="space-y-4"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-3xl font-bold gradient-text mb-4">
              Code, Coffee, and Creative Chaos
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              I've been building things with code since I was 13—starting with a website selling custom vinyl wrapped skateboards. Fast-forward through 14 years of development adventures, 
              6 riviting startup rollercoasters, countless late-night debugging sessions, and here we are, living the dream!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Now I spend my days designing game mechanics that blow people's minds, engineering Discord 
              systems that empower communities, and developing solutions to problems that keep me up at night. From debugging mysterious crashes to architecting scalable 
              solutions, I'm the developer you call when you need things done right the first time.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Outside of client work, I'm deeply involved in the developer community—mentoring newcomers, 
              sharing knowledge through tutorials and open-source contributions, and staying ahead of the curve 
              with emerging technologies. I'm passionate about writing code that not only solves problems elegantly 
              but also makes sense to the next person who has to maintain it (even if that person is future me).
            </p>
          </motion.div>

        </motion.div>

        {/* Right Column: Highlights + Project Progress */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Highlights - moved to right column */}
          <motion.div variants={itemVariants} className="space-y-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-purple-400 flex-shrink-0 mt-1">
                  {highlight.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-400">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {[
          { label: 'Years Coding', value: '14+', icon: <Code className="w-8 h-8" /> },
          { label: 'Active Projects', value: '8', icon: <Zap className="w-8 h-8" /> },
          { label: 'Communities Managed', value: '55+', icon: <Bot className="w-8 h-8" /> },
          { label: 'Happy Clients', value: '100+', icon: <Users className="w-8 h-8" /> },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center"
          >
            <Card className="p-6 text-center hover:shadow-neon-purple">
              <div className="text-purple-400 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default AboutSection;
