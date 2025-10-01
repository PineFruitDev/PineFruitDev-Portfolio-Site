'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Github,
  Linkedin
} from 'lucide-react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import TabContainer from '@/components/ui/TabContainer';
import DiscordMessagePreview from '@/components/ui/DiscordMessagePreview';
import DiscordContactForm from '@/components/ui/DiscordContactForm';
import CalendlyWidget from '@/components/ui/CalendlyWidget';
import { cn } from '@/lib/utils';

const ContactSection: React.FC = () => {
  const [shouldTriggerTyping, setShouldTriggerTyping] = useState(false);

  const contactInfo: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string | null;
    primary?: boolean;
  }> = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'contact@pinefruit.dev',
      href: 'mailto:contact@pinefruit.dev',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Remote Worldwide',
      href: null,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Response Time',
      value: 'Usually within hours on Discord',
      href: null,
    },
  ];

  const socialLinks = [
    {
      name: 'Discord',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      href: 'https://discord.com/users/227292400307929088',
      color: 'hover:text-[#5865F2]',
    },
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/PineFruitDev',
      color: 'hover:text-gray-400',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/pinefruitdev/',
      color: 'hover:text-blue-400',
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: 'https://twitter.com/PineFruitDev',
      color: 'hover:text-white',
    },
    {
      name: 'Reddit',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      href: 'https://www.reddit.com/user/PineFruitDev',
      color: 'hover:text-orange-500',
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: 'https://www.youtube.com/@pinefruitdev',
      color: 'hover:text-red-500',
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      href: 'https://www.tiktok.com/@pinefruitdev',
      color: 'hover:text-pink-500',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: 'https://www.instagram.com/pinefruitdev/',
      color: 'hover:text-pink-500',
    },
  ];

  return (
    <Section id="contact" background="gradient">
      <Section.Header
        subtitle="Let's connect"
        title="Get In Touch"
        description="Ready to start your project? Let's discuss how I can help bring your ideas to life."
      />

      {/* Tabbed Contact Interface */}
      <div 
        className="max-w-4xl mx-auto"
        onMouseEnter={() => {
          // Delay trigger by 1 second after hover
          setTimeout(() => setShouldTriggerTyping(true), 1000);
        }}
      >
        <TabContainer
          tabs={[
            {
              id: 'discord',
              label: 'Message on Discord',
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              ),
            },
            {
              id: 'schedule',
              label: 'Schedule a Meeting',
              icon: <Clock className="w-4 h-4" />,
            },
            {
              id: 'other',
              label: 'Other Ways to Connect',
              icon: <Mail className="w-4 h-4" />,
            },
          ]}
          defaultTab="discord"
        >
          {(activeTabId) => {
            switch (activeTabId) {
              case 'discord':
                return (
                  <div className="space-y-6">
                    {/* Sample Message - Right under nav */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <DiscordMessagePreview triggerTyping={shouldTriggerTyping} />
                    </motion.div>

                    {/* OR Divider */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center py-2"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-16"></div>
                        <span className="text-gray-400 font-medium text-sm tracking-wider">OR</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-16"></div>
                      </div>
                    </motion.div>

                    {/* Contact Form Below */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="p-8">
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-bold text-white mb-2">Send via Website</h4>
                          <p className="text-gray-400">
                            Fill out the form below and authenticate with Discord to send a formatted message.
                          </p>
                        </div>
                        <DiscordContactForm />
                      </Card>
                    </motion.div>
                  </div>
                );
              case 'schedule':
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Schedule a Consultation
                      </h3>
                      <p className="text-gray-400 max-w-2xl mx-auto">
                        Book a time that works for both of us to dive deep into your project requirements.
                      </p>
                    </div>

                    <Card className="overflow-hidden">
                      <CalendlyWidget
                        url="https://calendly.com/pinefruitdev?hide_event_type_details=1&hide_gdpr_banner=1"
                        height={700}
                      />
                    </Card>
                  </div>
                );
              case 'other':
                return (
                  <div className="space-y-8">
                    {/* Introductory Text */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Alternative Contact Options
                      </h3>
                      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        While Discord and scheduled meetings are my preferred methods for the fastest responses,
                        I understand everyone has different communication preferences. Here are additional ways
                        to connect with me, plus all my social media profiles where you can follow my work
                        and latest updates.
                      </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Contact Information */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="p-8 h-full">
                          <h4 className="text-xl font-bold text-white mb-6">Contact Information</h4>
                        <div className="space-y-6">
                          {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                                {item.href ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-purple-400 transition-colors font-medium"
                                  >
                                    {item.value}
                                  </a>
                                ) : (
                                  <p className="text-white font-medium">{item.value}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>

                    {/* Social Media */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="p-8 h-full">
                        <h4 className="text-xl font-bold text-white mb-6">Follow on Social Media</h4>
                        <div className="flex flex-wrap justify-center gap-4">
                          {socialLinks.map((link, index) => (
                            <motion.a
                              key={link.name}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                'p-4 rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-all duration-300',
                                link.color,
                                'hover:bg-white/10 hover:scale-110'
                              )}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 0.6 }}
                              title={link.name}
                            >
                              {link.icon}
                            </motion.a>
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm text-center mt-6">
                          Follow my work, updates, and behind-the-scenes content across all platforms
                        </p>
                      </Card>
                    </motion.div>
                    </div>
                  </div>
                );
              default:
                return (
                  <div className="space-y-6">
                    <DiscordMessagePreview triggerTyping={shouldTriggerTyping} />
                  </div>
                );
            }
          }}
        </TabContainer>
      </div>
    </Section>
  );
};

export default ContactSection;
