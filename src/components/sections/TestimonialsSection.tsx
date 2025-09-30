'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { Testimonial } from '@/types';
import { cn } from '@/lib/utils';
import { useCascadeScroll } from '@/hooks/useCascadeScroll';

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isHoveringReviews, setIsHoveringReviews] = useState(false);
  const [isHoveringProviders, setIsHoveringProviders] = useState(false);

  // Debounce carousel advances to prevent rapid switching
  const [reviewsScrollTimeout, setReviewsScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [providersScrollTimeout, setProvidersScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const debouncedReviewsNext = () => {
    if (reviewsScrollTimeout) clearTimeout(reviewsScrollTimeout);
    setReviewsScrollTimeout(setTimeout(() => {
      setCurrentReview(prev => (prev + 1) % customerReviews.length);
    }, 200));
  };

  const debouncedReviewsPrevious = () => {
    if (reviewsScrollTimeout) clearTimeout(reviewsScrollTimeout);
    setReviewsScrollTimeout(setTimeout(() => {
      setCurrentReview(prev => (prev - 1 + customerReviews.length) % customerReviews.length);
    }, 200));
  };

  const debouncedProvidersNext = () => {
    if (providersScrollTimeout) clearTimeout(providersScrollTimeout);
    setProvidersScrollTimeout(setTimeout(() => {
      setCurrentTestimonial(prev => (prev + 1) % providerReviews.length);
    }, 200));
  };

  const debouncedProvidersPrevious = () => {
    if (providersScrollTimeout) clearTimeout(providersScrollTimeout);
    setProvidersScrollTimeout(setTimeout(() => {
      setCurrentTestimonial(prev => (prev - 1 + providerReviews.length) % providerReviews.length);
    }, 200));
  };

  // Cascade scroll for reviews
  const reviewsCascade = useCascadeScroll({
    enabled: true,
    onNext: debouncedReviewsNext,
    onPrevious: debouncedReviewsPrevious,
    sensitivity: 0.3, // Much lower sensitivity
    threshold: 15, // Higher threshold for smoother transitions
  });

  // Cascade scroll for providers
  const providersCascade = useCascadeScroll({
    enabled: true,
    onNext: debouncedProvidersNext,
    onPrevious: debouncedProvidersPrevious,
    sensitivity: 0.3, // Much lower sensitivity
    threshold: 15, // Higher threshold for smoother transitions
  });

  const customerReviews: Testimonial[] = [
    {
      id: 'cr1',
      name: 'weak_dryingfn',
      role: 'Customer',
      company: 'Fiverr',
      content: 'PineFruit did an outstanding job fixing and enhancing my Fortnite map with UEFN and Verse. He addressed every issue with exceptional skill and professionalism. Communication was seamless, and I cant talk enough about the love and detail he treats these projects with, he approached the project with great care and dedication. Highly recommended!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'red'
    },
    {
      id: 'cr2',
      name: 'bertyjohannes',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Lovely Service, exceptional coder, very good at communicating throughout the order process also. If you\'re looking for a Verse know-it-all and a great person to work with, this is your go to. :)',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'purple'
    },
    {
      id: 'cr3',
      name: 'weak_dryingfn',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Super good delivery time, without any lack of quality or details. Working with this guy is always an absolute pleasure. English / communication is perfect, and he is extremely professional and talented. He thought everything through and knew exactly what he was doing. Highly recommended!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'red'
    },
    {
      id: 'cr4',
      name: 'raichurr',
      role: 'Fiverr Client', 
      company: 'Fiverr Review',
      content: 'Excellent! Got everything I asked for within a day. He also helped quickly with problems. Respond time was quick and the seller is friendly. 10/10 definitely will come back if something is needed again and I recommend the same for others too. Keep it up!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'green'
    },
    {
      id: 'cr5',
      name: 'jbison',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Great person to work with.. listens to everything you would like in your service.. has great communication.. makes things as simple as possible.. and does very good work.. would 100% recommend if you need a service like this or something similar',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'green'
    },
    {
      id: 'cr6',
      name: 'weak_dryingfn',
      role: 'Customer',
      company: 'Fiverr', 
      content: 'Exceeded my expectations! Great communication & professional workstyle. Loved the end result and am really surprised about the love and detail he treated this delivery with. 100% recommend, great guy.',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'red'
    },
    {
      id: 'cr7',
      name: 'brian_five',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Seller had great communication and was able to complete my order very quickly and did a good job',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'blue'
    },
    {
      id: 'cr8',
      name: 'qlr182',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Amazing service. Always willing to help',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'indigo'
    },
    {
      id: 'cr9',
      name: 'luisvidex',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Very good communication and result! Definitely would buy again👍🏽👍🏽',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'indigo'
    },
    {
      id: 'cr10',
      name: 'sunday_98',
      role: 'Customer',
      company: 'Fiverr',
      content: 'I got exactly what I ordered, very nice.',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'pink'
    },
    {
      id: 'cr11',
      name: 'weak_dryingfn',
      role: 'Customer',
      company: 'Fiverr',
      content: 'Absolutely thrilled with PineFruit\'s work! He fixed an issue in my UEFN project that I had been struggling with for ages - approached with great care, detail & love, highly recommend his services!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'red'
    },
    // Non-Fiverr testimonials (fake examples for display)
    {
      id: 'cr12',
      name: 'Sarah Mitchell',
      role: 'Community Manager',
      company: 'GameDev Studios',
      content: 'PineFruit transformed our Discord server into a thriving community hub. The custom bot features and server design exceeded all our expectations. Highly professional and creative approach.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'yellow'
    },
    {
      id: 'cr13',
      name: 'Alex Rodriguez',
      role: 'Lead Developer',
      company: 'TechFlow Solutions',
      content: 'Working with PineFruit on our UEFN project was incredible. Deep knowledge of Verse and game mechanics, plus excellent communication throughout the development process.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'green'
    },
    {
      id: 'cr14',
      name: 'Emily Chen',
      role: 'Project Manager',
      company: 'Creative Collective',
      content: 'PineFruit delivered a comprehensive web application that perfectly matched our requirements. Clean code, beautiful UI, and delivered ahead of schedule.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'pink'
    },
    {
      id: 'cr15',
      name: 'Michael Thompson',
      role: 'Startup Founder',
      company: 'InnovateLab',
      content: 'The Discord automation system PineFruit built for us saved countless hours of manual work. Professional, reliable, and incredibly talented developer.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'blue'
    }
  ];

  const providerReviews: Testimonial[] = [
    {
      id: 'pr1',
      name: 'ednoname',
      role: 'Provider',
      company: 'Fiverr',
      content: 'Great client!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'red'
    },
    {
      id: 'pr2', 
      name: 'pizzalagada',
      role: 'Provider',
      company: 'Fiverr',
      content: 'I enjoyed working with him. Thanks Thank you very much for your understanding, I\'m at your disposal for anything.',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'purple'
    },
    {
      id: 'pr3',
      name: 'juliapalmieri', 
      role: 'Provider',
      company: 'Fiverr',
      content: 'A very pleasant experience! They were flexible, open-minded, kind and very willing to talk about the project and the possibilities, of how to develop the graphic part. Really appreciated working together! :)',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'green'
    },
    {
      id: 'pr4',
      name: 'jasiahblaze',
      role: 'Provider',
      company: 'Fiverr',
      content: 'great experience',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'indigo'
    },
    {
      id: 'pr5',
      name: 'workwithmajai',
      role: 'Provider',
      company: 'Fiverr',
      content: 'Outstanding experience!',
      rating: 5,
      tags: [{ name: 'From Fiverr', color: 'green' }],
      accentColor: 'cyan'
    },
    // Temp filler provider reviews
    {
      id: 'pr6',
      name: 'Alexandra Smith',
      role: 'Graphic Designer',
      company: 'Creative Studios',
      content: 'Working with PineFruit was fantastic! Clear communication, timely payments, and great project direction. Would definitely collaborate again.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'pink'
    },
    {
      id: 'pr7',
      name: 'Marcus Chen',
      role: 'Audio Engineer',
      company: 'SoundWave Pro',
      content: 'Professional client who knew exactly what he wanted. Easy to work with and provided excellent feedback throughout the project.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'blue'
    },
    {
      id: 'pr8',
      name: 'Sofia Rodriguez',
      role: 'UI/UX Designer',
      company: 'Design Collective',
      content: 'Great collaboration! PineFruit was very responsive and gave constructive feedback. Made the design process smooth and enjoyable.',
      rating: 5,
      tags: [{ name: 'Temp Filler', color: 'orange' }],
      accentColor: 'cyan'
    }
   ];

   // Companies I've worked with
   const companies = [
     {
       id: 'readyup',
       name: 'ReadyUp',
       displayName: 'READYUP',
       link: 'https://getreadyup.com',
       accentColor: 'white',
     },
     {
       id: 'chartis',
       name: 'Chartis',
       displayName: 'CHARTIS',
       link: 'https://chartis.gg',
       accentColor: 'blue',
     },
     {
       id: 'foad',
       name: 'FOAD',
       displayName: 'FOAD',
       link: 'https://www.foad.gg/',
       accentColor: 'green',
     },
     {
       id: 'fnsg',
       name: 'FNSG',
       displayName: 'FNSG',
       link: 'https://discord.gg/fnsg',
       accentColor: 'orange',
     },
     {
       id: 'nda-company-1',
       name: 'AAA Studio',
       displayName: '?',
       link: '#',
       accentColor: 'gray',
       isNDA: true,
     },
     {
       id: 'nda-company-2',
       name: 'Major Brand',
       displayName: '?',
       link: '#',
       accentColor: 'gray',
       isNDA: true,
     },
   ];

   const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-5 h-5',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        )}
      />
    ));
  };

  // Space-themed animation variants
  const spaceVariants = {
    // Entry animations
    enterFromOrbit: { x: -400, y: -200, rotate: -15, scale: 0.4, opacity: 0 },
    enterFromNebula: { x: 300, y: -150, rotate: 10, scale: 0.3, opacity: 0 },
    enterFromWarp: { x: -500, scale: 0.2, opacity: 0 },
    enterFromMeteor: { x: 400, y: -300, rotate: 25, scale: 0.4, opacity: 0 },
    enterFromGalaxy: { x: -300, y: 200, rotate: -20, scale: 0.5, opacity: 0 },
    enterFromComet: { x: 500, y: 150, rotate: 30, scale: 0.4, opacity: 0 },
    enterFromVoid: { scale: 0.1, rotate: 45, opacity: 0 },
    enterFromPulsar: { x: -200, y: -400, rotate: -25, scale: 0.3, opacity: 0 },
    
    // Center state
    center: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
    
    // Exit animations
    exitToOrbit: { x: 400, y: 200, rotate: 15, scale: 0.4, opacity: 0 },
    exitToNebula: { x: -300, y: 150, rotate: -10, scale: 0.3, opacity: 0 },
    exitToWarp: { x: 500, scale: 0.2, opacity: 0 },
    exitToMeteor: { x: -400, y: 300, rotate: -25, scale: 0.4, opacity: 0 },
    exitToGalaxy: { x: 300, y: -200, rotate: 20, scale: 0.5, opacity: 0 },
    exitToComet: { x: -500, y: -150, rotate: -30, scale: 0.4, opacity: 0 },
    exitToVoid: { scale: 0.1, rotate: -45, opacity: 0 },
    exitToPulsar: { x: 200, y: 400, rotate: 25, scale: 0.3, opacity: 0 },
  };
  
  const getRandomAnimation = (type: 'enter' | 'exit') => {
    const animations = type === 'enter' 
      ? ['enterFromOrbit', 'enterFromNebula', 'enterFromWarp', 'enterFromMeteor', 'enterFromGalaxy', 'enterFromComet', 'enterFromVoid', 'enterFromPulsar'] as const
      : ['exitToOrbit', 'exitToNebula', 'exitToWarp', 'exitToMeteor', 'exitToGalaxy', 'exitToComet', 'exitToVoid', 'exitToPulsar'] as const;
    
    const randomIndex = Math.floor(Math.random() * animations.length);
    return spaceVariants[animations[randomIndex] as keyof typeof spaceVariants];
  };

  const getAccentColors = (accentColor?: string) => {
    const colors = {
      blue: { text: 'text-blue-400', glow: 'hover:shadow-neon-blue' },
      purple: { text: 'text-purple-400', glow: 'hover:shadow-neon-purple' },
      green: { text: 'text-green-400', glow: 'hover:shadow-neon-green' },
      cyan: { text: 'text-cyan-400', glow: 'hover:shadow-neon-cyan' },
      pink: { text: 'text-pink-400', glow: 'hover:shadow-neon-pink' },
      yellow: { text: 'text-yellow-400', glow: 'hover:shadow-neon-yellow' },
      red: { text: 'text-red-400', glow: 'hover:shadow-neon-red' },
      indigo: { text: 'text-indigo-400', glow: 'hover:shadow-neon-indigo' },
      orange: { text: 'text-orange-400', glow: 'hover:shadow-neon-orange' },
      white: { text: 'text-white', glow: 'hover:shadow-neon-white' },
      gray: { text: 'text-gray-400', glow: 'hover:shadow-neon-gray' },
    };
    
    return colors[accentColor as keyof typeof colors] || colors.blue;
  };

  // Auto-advance Reviews
  useEffect(() => {
    if (!isAutoPlaying || isHoveringReviews) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % customerReviews.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHoveringReviews, customerReviews.length]);
  
  // Auto-advance Working Together - staggered timing (7.5s offset)
  useEffect(() => {
    if (!isAutoPlaying || isHoveringProviders) return;

    const initialTimeout = setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % providerReviews.length);
      
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % providerReviews.length);
      }, 15000);
      
      return () => clearInterval(interval);
    }, 7500);

    return () => clearTimeout(initialTimeout);
  }, [isAutoPlaying, isHoveringProviders, providerReviews.length]);

  return (
    <Section id="testimonials" background="default">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm uppercase tracking-widest text-purple-400 font-medium mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Client feedback
        </motion.p>
        
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          What People Say
        </motion.h2>
        
         <motion.div
           className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
         >
           <p>Real feedback from clients who've experienced my work firsthand.</p>
           <p>Quality speaks louder than promises.</p>
         </motion.div>
      </motion.div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-3">
              Reviews of My Work
            </h3>
            <p className="text-gray-400 text-sm">
              Authentic testimonials from clients who've trusted me with their projects.
            </p>
          </div>
          <div className="hidden lg:block" />
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-3">
              Working Together
            </h3>
            <p className="text-gray-400 text-sm">
              Feedback from talented professionals who've collaborated with me.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16">
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[2px] bg-gradient-to-b from-transparent via-purple-400/80 to-transparent pointer-events-none z-10 shadow-lg shadow-purple-500/20" />

           {/* Left Carousel */}
           <div 
             ref={reviewsCascade.containerRef}
             className="relative px-20 py-8 min-h-[400px] flex items-center justify-center"
             onMouseEnter={() => setIsHoveringReviews(true)}
             onMouseLeave={() => setIsHoveringReviews(false)}
           >
            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={getRandomAnimation('enter')}
                  animate={{
                    ...spaceVariants.center,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      duration: 1.2
                    }
                  }}
                  exit={{
                    ...getRandomAnimation('exit'),
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Card 
                    hover={false}
                    className={cn(
                      "relative p-6 pt-10 transition-all duration-300 h-[360px] flex flex-col",
                      getAccentColors(customerReviews[currentReview]?.accentColor).glow
                    )}
                  >
                    {/* Header section with avatar, name, stars, role */}
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 mr-6">
                        {customerReviews[currentReview]?.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold">
                            {customerReviews[currentReview]?.name}
                          </h4>
                          <div className="flex">
                            {renderStars(customerReviews[currentReview]?.rating || 5)}
                          </div>
                        </div>
                        
                        <div>
                          <span className={cn(
                            'text-sm',
                            getAccentColors(customerReviews[currentReview]?.accentColor).text
                          )}>
                            {customerReviews[currentReview]?.role} • {customerReviews[currentReview]?.company}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                     {/* Review text spanning full width */}
                     <div 
                       ref={reviewsCascade.scrollableRef}
                       className="text-gray-300 leading-relaxed overflow-y-auto flex-1 project-scroll"
                       style={{ 
                         maxHeight: '240px',
                         overflowY: customerReviews[currentReview]?.content.length > 300 ? 'auto' : 'visible'
                       }}
                     >
                       "{customerReviews[currentReview]?.content}"
                     </div>
                    
                    <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
                      {customerReviews[currentReview]?.tags?.map((tag, i) => (
                        <span 
                          key={i}
                          className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            tag.color === 'green' && 'bg-green-500/20 text-green-400',
                            tag.color === 'orange' && 'bg-orange-500/20 text-orange-400',
                            tag.color === 'blue' && 'bg-blue-500/20 text-blue-400'
                          )}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => setCurrentReview(prev => (prev - 1 + customerReviews.length) % customerReviews.length)}
                className={cn(
                  "absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all duration-300 z-10 shadow-lg hover:scale-110",
                  getAccentColors(customerReviews[currentReview]?.accentColor).glow
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentReview(prev => (prev + 1) % customerReviews.length)}
                className={cn(
                  "absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all duration-300 z-10 shadow-lg hover:scale-110",
                  getAccentColors(customerReviews[currentReview]?.accentColor).glow
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block" />

           {/* Right Carousel */}
           <div 
             ref={providersCascade.containerRef}
             className="relative px-20 py-8 min-h-[400px] flex items-center justify-center"
             onMouseEnter={() => setIsHoveringProviders(true)}
             onMouseLeave={() => setIsHoveringProviders(false)}
           >
            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={getRandomAnimation('enter')}
                  animate={{
                    ...spaceVariants.center,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      duration: 1.2
                    }
                  }}
                  exit={{
                    ...getRandomAnimation('exit'),
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Card 
                    hover={false}
                    className={cn(
                      "relative p-6 pt-10 transition-all duration-300 h-[360px] flex flex-col",
                      getAccentColors(providerReviews[currentTestimonial]?.accentColor).glow
                    )}
                  >
                    {/* Header section with avatar, name, stars, role */}
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 mr-6">
                        {providerReviews[currentTestimonial]?.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold">
                            {providerReviews[currentTestimonial]?.name}
                          </h4>
                          <div className="flex">
                            {renderStars(providerReviews[currentTestimonial]?.rating || 5)}
                          </div>
                        </div>
                        
                        <div>
                          <span className={cn(
                            'text-sm',
                            getAccentColors(providerReviews[currentTestimonial]?.accentColor).text
                          )}>
                            {providerReviews[currentTestimonial]?.role} • {providerReviews[currentTestimonial]?.company}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                     {/* Review text spanning full width */}
                     <div 
                       ref={providersCascade.scrollableRef}
                       className="text-gray-300 leading-relaxed flex-1 project-scroll"
                       style={{ 
                         maxHeight: '240px',
                         overflowY: providerReviews[currentTestimonial]?.content.length > 300 ? 'auto' : 'visible'
                       }}
                     >
                       "{providerReviews[currentTestimonial]?.content}"
                     </div>
                    
                    <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
                      {providerReviews[currentTestimonial]?.tags?.map((tag, i) => (
                        <span 
                          key={i}
                          className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            tag.color === 'green' && 'bg-green-500/20 text-green-400',
                            tag.color === 'orange' && 'bg-orange-500/20 text-orange-400',
                            tag.color === 'blue' && 'bg-blue-500/20 text-blue-400'
                          )}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => setCurrentTestimonial(prev => (prev - 1 + providerReviews.length) % providerReviews.length)}
                className={cn(
                  "absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all duration-300 z-10 shadow-lg hover:scale-110",
                  getAccentColors(providerReviews[currentTestimonial]?.accentColor).glow
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentTestimonial(prev => (prev + 1) % providerReviews.length)}
                className={cn(
                  "absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all duration-300 z-10 shadow-lg hover:scale-110",
                  getAccentColors(providerReviews[currentTestimonial]?.accentColor).glow
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
           </div>
         </div>

         {/* Companies I've Worked With - Logo Carousel */}
         <motion.div
           className="mt-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <div className="text-center mb-12">
             <h3 className="text-3xl font-bold gradient-text mb-4">
               Companies I've Worked With
             </h3>
             <p className="text-gray-400 max-w-2xl mx-auto">
               Trusted by industry leaders and innovative startups across gaming and tech
             </p>
           </div>

           {/* Company Logo Carousel */}
           <div className="relative overflow-hidden py-4" style={{ height: '320px' }}>
             {/* Fade masks on edges */}
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
             
             <motion.div
               className="absolute inset-0 flex items-center gap-12 py-4"
               animate={{ x: [0, -(220 + 48) * companies.length] }} // Move exactly one full set of companies
               transition={{
                 duration: 30,
                 repeat: Infinity,
                 ease: "linear",
                 repeatType: "loop"
               }}
               style={{ width: `${(220 + 48) * companies.length * 2}px` }} // Width for 2 sets
             >
             {/* Create seamless infinite loop */}
             {[...companies, ...companies].map((company, index) => (
               <motion.div
                 key={`${company.id}-${index}`}
                 className={cn(
                   "group relative rounded-xl transition-all duration-300 cursor-pointer flex-shrink-0",
                   company.isNDA 
                     ? "bg-white/2 border border-white/5 opacity-40 hover:opacity-60" 
                     : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
                   !company.isNDA && getAccentColors(company.accentColor).glow
                 )}
                 style={{ height: '280px', width: '220px' }}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: company.isNDA ? 0.4 : 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 onClick={() => {
                   if (!company.isNDA && company.link !== '#') {
                     window.open(company.link, '_blank');
                   }
                 }}
               >
                 {/* NDA Badge for locked companies */}
                 {company.isNDA && (
                   <div className="absolute top-3 right-3 z-10">
                     <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                       NDA
                     </span>
                   </div>
                 )}

                 {/* Company Logo Area - Larger logos to fill most of the card */}
                 <div className="flex items-center justify-center" style={{ height: '220px' }}>
                   <div className={cn(
                     "w-44 h-44 rounded-2xl flex items-center justify-center transition-all duration-300",
                     company.isNDA 
                       ? "bg-gray-800 group-hover:bg-gray-700" 
                       : "bg-gray-700 group-hover:bg-gray-600"
                   )}>
                     <div className={cn(
                       "text-6xl font-bold transition-colors duration-300",
                       company.isNDA 
                         ? "text-gray-600 group-hover:text-gray-500" 
                         : "text-gray-400 group-hover:text-white"
                     )}>
                       {company.displayName.charAt(0)}
                     </div>
                   </div>
                 </div>
                 
                 {/* Company Name - Bottom section */}
                 <div className={cn(
                   "flex items-center justify-center transition-all duration-300",
                   company.isNDA 
                     ? "bg-gray-900/30 group-hover:bg-gray-800/40" 
                     : "bg-gray-800/50 group-hover:bg-gray-700/50"
                 )} style={{ height: '60px' }}>
                   <p className={cn(
                     "transition-colors duration-300 text-base font-medium text-center",
                     company.isNDA 
                       ? "text-gray-600 group-hover:text-gray-500" 
                       : "text-gray-400 group-hover:text-white"
                   )}>
                     {company.isNDA ? `${company.name} (Coming Soon)` : company.name}
                   </p>
                 </div>

                 {/* Hover Effect Overlay */}
                 <div className={cn(
                   "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                   `bg-gradient-to-br from-${company.accentColor}-500/10 to-${company.accentColor}-600/5`
                 )} />
               </motion.div>
             ))}
             </motion.div>
           </div>
         </motion.div>
       </div>
     </Section>
   );
 };
 
 export default TestimonialsSection;