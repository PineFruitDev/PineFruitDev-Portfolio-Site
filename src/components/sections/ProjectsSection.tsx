'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code,
  Gamepad2,
  Bot,
  MessageCircle,
  Layers,
} from 'lucide-react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TabContainer from '@/components/ui/TabContainer';
import { useCascadeScroll } from '@/hooks/useCascadeScroll';
import { Project } from '@/types';

// Project Grid Component
interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projectsCascade = useCascadeScroll({
    enabled: true,
    onNext: () => {}, // No carousel behavior for projects, just scroll
    onPrevious: () => {},
    sensitivity: 0.3, // Smooth scroll speed
    threshold: 1, // Tight boundary detection
    allowPageScrollPassthrough: true, // Enable seamless page scroll passthrough
  });

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
    <>
      {/* Projects Grid - Fixed height container showing 2 rows */}
      <div 
        ref={projectsCascade.containerRef}
        className="rounded-lg" 
        style={{ height: 'calc(2 * (320px + 2rem))' }}
      >
        <div 
          ref={projectsCascade.scrollableRef}
          className="overflow-y-auto h-full"
        >
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
          >
            <Card 
              className="group overflow-hidden h-full"
            >
              {/* Project Image - 3x2 aspect ratio */}
              <div className="relative aspect-[3/2] mb-6 bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-16 h-16 text-gray-600" />
                </div>
                
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<ExternalLink className="w-4 h-4" />}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          Live Demo
                        </Button>
                      </div>
                    )}
                    {project.githubUrl && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Github className="w-4 h-4" />}
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          Code
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              <Card.Header>
                <div className="flex items-center justify-between mb-2">
                  <Card.Title className="text-lg group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </Card.Title>
                  <div className="flex gap-2">
                    {project.isNDA && (
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30 cursor-help">
                          NDA
                        </span>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                          Project details may be added once NDA expires
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                <Card.Description className="text-sm">
                  {project.description}
                </Card.Description>
              </Card.Header>

              <Card.Content>
                {/* Technologies - show all */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
        </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-card border border-gray-700 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 relative">
                {/* Close Button - Top Right */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-3 hover:bg-gray-700/50 rounded-full transition-all duration-200 z-10 text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>

                {/* Project Tags - Top of container */}
                {selectedProject.isNDA && (
                  <div className="mb-6 px-2">
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30">
                        NDA Protected
                      </span>
                    </div>
                  </div>
                )}

                {/* Main Layout Grid */}
                <div className="grid md:grid-cols-5 gap-8">
                  {/* Left Side - Image and Technologies (2/5 width) */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Project Image - 3x2 aspect ratio */}
                    <div className="relative aspect-[3/2] bg-gray-800 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-16 h-16 text-gray-600" />
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Side - Title and Description (3/5 width) */}
                  <div className="md:col-span-3 relative">

                    {/* Content aligned left */}
                    <div className="space-y-6 h-full relative">
                      {/* Title */}
                      <div>
                        <h3 className="text-3xl font-bold gradient-text mb-2">
                          {selectedProject.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="text-gray-300 leading-relaxed">
                        <p>{selectedProject.longDescription || selectedProject.description}</p>
                      </div>

                      {/* Actions - Bottom Right */}
                      {(selectedProject.liveUrl || selectedProject.githubUrl) && (
                        <div className="absolute bottom-0 right-0 flex gap-3 max-w-full">
                          {selectedProject.liveUrl && (
                            <Button
                              variant="primary"
                              icon={<ExternalLink className="w-4 h-4" />}
                              href={selectedProject.liveUrl}
                              external
                              className="text-sm px-3 py-2 whitespace-nowrap"
                            >
                              Live Demo
                            </Button>
                          )}
                          {selectedProject.githubUrl && (
                            <Button
                              variant="outline"
                              icon={<Github className="w-4 h-4" />}
                              href={selectedProject.githubUrl}
                              external
                              className="text-sm px-3 py-2 whitespace-nowrap"
                            >
                              Code
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectsSection: React.FC = () => {

  const projects: Project[] = [
    // Game Dev Projects
    {
      id: 'aaa-game-project',
      title: 'AAA Game Development',
      description: 'Verse programming and game systems for major studio project',
      longDescription: 'Contributing to a large-scale game development project for a well-known AAA studio. Responsibilities include Verse programming, game mechanics implementation, system optimization, and collaboration with cross-functional teams. Project details remain confidential due to ongoing development.',
      technologies: ['Verse', 'UEFN', 'Unreal Engine', 'Game Design', 'Performance Optimization'],
      imageUrl: '/projects/aaa-game.jpg',
      category: 'game',
      isNDA: true,
    },
    {
      id: 'analytics-platform',
      title: 'Gaming Analytics Platform',
      description: 'Custom leaderboard and achievement tracking system',
      longDescription: 'Developed a comprehensive backend and frontend system for a major marketing agency in the gaming space. Features real-time leaderboards, custom achievement systems, game API integrations, and detailed analytics dashboards. Built to handle large-scale events with high-performance requirements.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Game APIs', 'Real-time Analytics', 'Docker'],
      imageUrl: '/projects/analytics-platform.jpg',
      category: 'game',
      isNDA: true,
    },
    // Discord Bots
    {
      id: 'readyup-bot',
      title: 'ReadyUp Bot',
      description: 'Comprehensive UEFN creator toolkit with verification and analytics',
      longDescription: 'An all-in-one Discord bot solution for UEFN creators featuring user verification systems, Fortnite map analytics diagnosis, discovery tab alerts, creator tools, and community management features. Plans to expand to all UGC platforms. Serving the ReadyUp community and growing.',
      technologies: ['Discord.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Epic Games API', 'Redis'],
      imageUrl: '/projects/readyup-bot.jpg',
      liveUrl: 'https://getreadyup.com',
      category: 'discord-bot',
    },
    {
      id: 'modulix-bot',
      title: 'Modulix Bot',
      description: 'Next-generation Discord bot designed to replace MEE6',
      longDescription: 'A comprehensive Discord automation solution featuring advanced moderation, community engagement tools, custom commands, analytics dashboard, and enterprise-grade scalability. Built to address the limitations of existing bots with modern architecture and extensive customization options.',
      technologies: ['Discord.js', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'React Dashboard'],
      imageUrl: '/projects/modulix-bot.jpg',
      category: 'discord-bot',
    },
    {
      id: 'tstemplatebot',
      title: 'TSTemplateBot',
      description: 'Open source TypeScript Discord bot template',
      longDescription: 'A comprehensive template for building Discord bots with TypeScript. Features modern architecture, command handling, database integration, and development best practices. Open source project to help other developers get started with Discord bot development.',
      technologies: ['TypeScript', 'Discord.js', 'Node.js', 'Open Source'],
      imageUrl: '/projects/tstemplatebot.jpg',
      githubUrl: 'https://github.com/PineFruitDev/TSTemplateBot',
      category: 'discord-bot',
    },
    // Discord Servers
    {
      id: 'uefn-market-server',
      title: 'UEFN Market Discord',
      description: 'Community hub for UGC creators and service providers',
      longDescription: 'A thriving Discord community connecting UEFN creators with specialized service providers. Features custom server architecture, automated verification, project matching, and community management systems.',
      technologies: ['Discord Server Design', 'Community Management', 'Custom Bots', 'Verification Systems'],
      imageUrl: '/projects/uefn-market-server.jpg',
      liveUrl: 'https://discord.gg/uefnmarket',
      category: 'discord-server',
    },
    {
      id: 'uefn-tag-server',
      title: 'UEFN Tag Discord',
      description: 'UEFN creator community and collaboration space',
      longDescription: 'A focused Discord community for UEFN creators featuring collaboration channels, resource sharing, creator spotlights, and community events. Custom server design with automated moderation and engagement features.',
      technologies: ['Discord Server Design', 'Community Architecture', 'Moderation Systems'],
      imageUrl: '/projects/uefn-tag-server.jpg',
      liveUrl: 'https://discord.gg/Zt2zu6gGmM',
      category: 'discord-server',
    },
    {
      id: 'readyup-server',
      title: 'ReadyUp Discord',
      description: 'UEFN creator toolkit community',
      longDescription: 'The official Discord community for ReadyUp, featuring creator tools, verification systems, map analytics, and community support. Integrated with the ReadyUp Bot for seamless user experience.',
      technologies: ['Discord Server Design', 'Bot Integration', 'Creator Tools', 'Analytics'],
      imageUrl: '/projects/readyup-server.jpg',
      liveUrl: 'https://discord.gg/getreadyup',
      category: 'discord-server',
    },
    // Other Projects
    {
      id: 'brand-integrations',
      title: 'Brand Integration Projects',
      description: 'Strategic project management for entertainment brand collaborations',
      longDescription: 'Leading technical project management for multiple high-profile brand integrations in the Fortnite ecosystem. Coordinating between artists, brands, development teams, and platform holders to deliver seamless integration experiences. Projects span music, entertainment, and consumer brand partnerships.',
      technologies: ['Project Management', 'UEFN', 'Brand Strategy', 'Cross-team Coordination', 'Launch Planning'],
      imageUrl: '/projects/brand-integrations.jpg',
      category: 'other',
      isNDA: true,
    },
    {
      id: 'bluesky-labeller',
      title: 'Bluesky UEFN Labeller',
      description: 'Automated UEFN/Verse content tagging system for Bluesky',
      longDescription: 'An automated labelling system for Bluesky that identifies and tags UEFN and Verse-related content. Helps creators and developers discover relevant content and connect with the UEFN community on the platform.',
      technologies: ['Bluesky API', 'Content Analysis', 'Automated Tagging', 'TypeScript'],
      imageUrl: '/projects/bluesky-labeller.jpg',
      liveUrl: 'https://bsky.app/profile/uefn.pinefruit.dev',
      category: 'other',
    },
  ];


  return (
    <Section id="projects" background="gradient">
      <Section.Header
        subtitle="Things I've built"
        title="Projects & Creations"
        description="From game dev to Discord automation, here's what I've been working on."
      />

      {/* Tabbed Projects Interface */}
      <TabContainer
        tabs={[
          {
            id: 'all',
            label: `All Projects (${projects.length})`,
            icon: <Layers className="w-4 h-4" />,
          },
          {
            id: 'game',
            label: `Game Dev (${projects.filter(p => p.category === 'game').length})`,
            icon: <Gamepad2 className="w-4 h-4" />,
          },
          {
            id: 'discord-bot',
            label: `Discord Bots (${projects.filter(p => p.category === 'discord-bot').length})`,
            icon: <Bot className="w-4 h-4" />,
          },
          {
            id: 'discord-server',
            label: `Discord Servers (${projects.filter(p => p.category === 'discord-server').length})`,
            icon: <MessageCircle className="w-4 h-4" />,
          },
          {
            id: 'other',
            label: `Other (${projects.filter(p => p.category === 'other').length})`,
            icon: <Code className="w-4 h-4" />,
          },
        ]}
        defaultTab="all"
        className="max-w-7xl mx-auto"
      >
        {/* All Projects Tab */}
        <ProjectGrid projects={projects} />

        {/* Game Dev Tab */}
        <ProjectGrid projects={projects.filter(p => p.category === 'game')} />

        {/* Discord Bots Tab */}
        <ProjectGrid projects={projects.filter(p => p.category === 'discord-bot')} />

        {/* Discord Servers Tab */}
        <ProjectGrid projects={projects.filter(p => p.category === 'discord-server')} />

        {/* Other Tab */}
        <ProjectGrid projects={projects.filter(p => p.category === 'other')} />
      </TabContainer>

    </Section>
  );
};

export default ProjectsSection;
