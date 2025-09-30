'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabContainerProps {
  tabs: Tab[];
  children: React.ReactNode[];
  defaultTab?: string;
  className?: string;
}

const TabContainer: React.FC<TabContainerProps> = ({
  tabs,
  children,
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      {/* Unified Container with Tab Header */}
      <motion.div
        className="glass-card rounded-xl overflow-hidden border border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Tab Navigation Header */}
        <div className="bg-gray-800/80 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-center">
            <div className="flex bg-gray-900/50 rounded-lg p-1">
              {tabs.map((tab, _index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative',
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active tab background */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Tab content */}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon && (
                      <span className="flex-shrink-0">
                        {tab.icon}
                      </span>
                    )}
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Area - Dynamic Height */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ 
                duration: 0.4,
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="p-8"
            >
              {children[activeIndex]}
            </motion.div>
          </AnimatePresence>
          
          {/* Animated background gradient based on active tab */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: activeTab === 'discord' 
                ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.03), rgba(168, 85, 247, 0.03))'
                : activeTab === 'schedule'
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(6, 182, 212, 0.03))'
                : 'linear-gradient(135deg, rgba(156, 163, 175, 0.03), rgba(107, 114, 128, 0.03))'
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TabContainer;
