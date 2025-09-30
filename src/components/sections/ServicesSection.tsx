'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Gamepad2, 
  Bot, 
  Smartphone, 
  Database, 
  Zap, 
  Check, 
  Star
} from 'lucide-react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { Service } from '@/types';

const ServicesSection: React.FC = () => {

  const services: Service[] = [
    {
      id: 'uefn-verse-development',
      title: 'UEFN & Verse Engineering',
      description: 'Cutting-edge Fortnite experiences that captivate players, and fellow developers, worldwide',
      icon: 'Gamepad2',
      features: [
        'Advanced Verse Programming',
        'High-Performance Game Systems',
        'Innovative Mechanics Design',
        'Support, Tutoring & Coaching',
        'Scalability Optimization',
        'Bug Fixes & Maintenance',
      ],
      popular: true,
    },
    {
      id: 'discord-development',
      title: 'Discord Development',
      description: 'Powerful Discord ecosystems that drive community engagement',
      icon: 'Bot',
      features: [
        'Advanced Bot Architecture',
        'Stunning Server Experiences',
        'Automated Community Systems',
        'Seamless API Integration',
        'Enterprise-Grade Infrastructure',
        'Comprehensive Support',
      ],
      popular: true,
    },
    {
      id: 'web-development',
      title: 'Full-Stack Web Development',
      description: 'Lightning-fast web applications built for scale, performance and success',
      icon: 'Code',
      features: [
        'Custom Web Applications',
        'E-commerce & Payment Systems',
        'Admin Dashboards & Analytics',
        'Portfolio & Business Websites',
        'API Development & Integration',
        'Database Architecture & Hosting',
      ],
    },
    {
      id: 'project-management',
      title: 'Technical Leadership',
      description: 'Strategic direction that transforms complexity into clear results',
      icon: 'Zap',
      features: [
        'Technical Project Planning',
        'Team Coordination & Communication',
        'Requirements Analysis & Documentation',
        'Quality Assurance & Testing',
        'Launch Strategy & Execution',
        'Post-Launch Support & Optimization',
      ],
    },
    {
      id: 'branding-design',
      title: 'Brand & Visual Design',
      description: 'Memorable brand identities that demand attention and drive results',
      icon: 'Smartphone',
      features: [
        'Logo Design & Brand Identity',
        'Marketing Materials & Graphics',
        'Social Media Templates & Assets',
        'Character Design & Mascots',
        'Website Mockups & UI Design',
        'Custom Illustrations & Artwork',
      ],
    },
    {
      id: 'something-else',
      title: 'Something Else',
      description: 'Creative solutions for unique challenges and random requests',
      icon: 'Database',
      features: [
        'Technical Consulting',
        'Training & Mentorship Sessions',
        'Diagram & Mindmap Generation',
        'Technical Writing & Documentation',
        'Explaining why your code broke at 3 AM',
        'Probably anything else you can think of',
      ],
    },
  ];

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Code: <Code className="w-8 h-8" />,
      Gamepad2: <Gamepad2 className="w-8 h-8" />,
      Bot: <Bot className="w-8 h-8" />,
      Smartphone: <Smartphone className="w-8 h-8" />,
      Database: <Database className="w-8 h-8" />,
      Zap: <Zap className="w-8 h-8" />,
    };
    return iconMap[iconName] || <Code className="w-8 h-8" />;
  };

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
    <Section id="services" background="default">
      <Section.Header
        subtitle="What I bring to the table"
        title="Services & Solutions"
        description="Turning complex technical challenges into elegant, scalable solutions"
      />

      {/* Main Services Grid - first */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <Card 
              className="relative h-full transition-all duration-300 border-b-2 border-b-purple-500/30 flex flex-col"
              hover={false}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold text-white z-10">
                  <Star className="w-3 h-3 inline mr-1" />
                  Popular
                </div>
              )}

              <Card.Header className="text-center">
                <div className="flex justify-center mb-4">
                  <motion.div
                    className="p-3 rounded-xl bg-purple-500/10 text-purple-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getIcon(service.icon)}
                  </motion.div>
                </div>

                <Card.Title className="text-xl mb-2">
                  {service.title}
                </Card.Title>
                
                <Card.Description>
                  {service.description}
                </Card.Description>
              </Card.Header>

              <Card.Content className="flex flex-col flex-grow">
                <div className="border-t border-gray-700 pt-4 mt-auto">
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Process Section - second */}
      <motion.div
        className="my-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold gradient-text mb-4">
            How We'll Work Together
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My battle-tested workflow ensures your project stays on track, exceeds expectations, and launches without a hitch, leaving you to wonder what more I can do for you.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Deep Dive', description: 'Understanding your vision, challenges, and success metrics' },
            { step: '02', title: 'Strategy', description: 'Crafting a roadmap that balances ambition with reality' },
            { step: '03', title: 'Execute', description: 'Building with precision while keeping you in the loop' },
            { step: '04', title: 'Launch', description: 'Thorough testing, smooth deployment, and ongoing support' },
          ].map((phase, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connection line */}
              {index < 3 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
              )}
              
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mb-4 mx-auto">
                  {phase.step}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{phase.title}</h4>
                <p className="text-gray-400 text-sm">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Tiers Section - last */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Time & Budget Packages
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Flexible pricing that scales with your ambitions. Every project is unique—these rates are just the starting point for building something extraordinary together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Day Tier */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center h-full hover:shadow-neon-purple flex flex-col relative">
              <div className="absolute top-4 left-4 text-xs text-gray-500/50 font-medium uppercase tracking-wider">
                Day
              </div>
              <Card.Header>
                <div className="text-4xl mb-4">⚡</div>
                <Card.Title className="text-xl mb-2">Sprint Session</Card.Title>
                <Card.Description>Lightning-fast solutions for an immediate impact and quick wins</Card.Description>
              </Card.Header>
              <Card.Content className="flex flex-col flex-grow">
                <div className="mt-auto text-center">
                  <div className="text-5xl font-bold text-purple-400 mb-2">$800</div>
                  <div className="text-gray-400 text-base mb-4">8 hours • $100/hr</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 text-left mb-3">
                  <li>• Quick wins & urgent fixes</li>
                  <li>• Focused consultation sessions</li>
                  <li>• Rapid prototyping & testing</li>
                  <li>• Technical strategy planning</li>
                </ul>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium invisible">Save $000!</div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>

          {/* Week Tier */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-semibold text-white z-10">
              <Star className="w-3 h-3 inline mr-1" />
              20% OFF
            </div>
            <Card className="text-center h-full hover:shadow-neon-blue ring-2 ring-blue-500/20 flex flex-col relative">
              <div className="absolute top-4 left-4 text-xs text-gray-500/50 font-medium uppercase tracking-wider">
                Week
              </div>
              <Card.Header>
                <div className="text-4xl mb-4">🚀</div>
                <Card.Title className="text-xl mb-2">Power Week</Card.Title>
                <Card.Description>Feature development shipped with unmatched precision and care</Card.Description>
              </Card.Header>
              <Card.Content className="flex flex-col flex-grow">
                <div className="mt-auto text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">$3,200</div>
                  <div className="text-gray-400 text-base mb-4">40 hours • <span className="line-through">$4,000</span></div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 text-left mb-3">
                  <li>• Ideal for medium-scope projects</li>
                  <li>• Multiple feature implementations</li>
                  <li>• Cross-platform integrations</li>
                  <li>• Comprehensive testing included</li>
                </ul>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium">Save $800!</div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>

          {/* Month Tier */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-semibold text-white z-10">
              <Star className="w-3 h-3 inline mr-1" />
              35% OFF
            </div>
            <Card className="text-center h-full hover:shadow-neon-cyan ring-2 ring-cyan-500/20 flex flex-col relative">
              <div className="absolute top-4 left-4 text-xs text-gray-500/50 font-medium uppercase tracking-wider">
                Month
              </div>
              <Card.Header>
                <div className="text-4xl mb-4">🏆</div>
                <Card.Title className="text-xl mb-2">Extended Partnership</Card.Title>
                <Card.Description>Ambitious projects brought to life with dedicated focus and lots of coffee</Card.Description>
              </Card.Header>
              <Card.Content className="flex flex-col flex-grow">
                <div className="mt-auto text-center">
                  <div className="text-5xl font-bold text-cyan-400 mb-2">$10,400</div>
                  <div className="text-gray-400 text-base mb-4">160 hours • <span className="line-through">$16,000</span></div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 text-left mb-3">
                  <li>• Perfect for large-scale projects</li>
                  <li>• Complete system architectures</li>
                  <li>• Ongoing development & iteration</li>
                  <li>• Full documentation & support</li>
                </ul>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium">Save $5,600!</div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-gray-400 mt-8 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          💡 <strong>Flexible Pricing</strong> These price points are to give you an idea for my costs, but every project has unique requirements.
        </motion.p>
      </motion.div>
    </Section>
  );
};

export default ServicesSection;
