'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiscordReplyButton from './DiscordReplyButton';

interface DiscordMessagePreviewProps {
  message?: string;
  username?: string;
  avatar?: string;
  triggerTyping?: boolean;
}

const DiscordMessagePreview: React.FC<DiscordMessagePreviewProps> = ({
  message: _message = "Hey! I'm interested in working with you on a project. Let's chat about bringing some ideas to life!",
  username: _username = "Sky",
  avatar: _avatar = "https://cdn.discordapp.com/embed/avatars/0.png",
  triggerTyping = false
}) => {
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [messageTimestamp, setMessageTimestamp] = useState('');

  useEffect(() => {
    if (!triggerTyping) return;

    const fullMessage = [
      "👋 Hey, thanks for checking out my site!",
      "",
      "If you'd like to connect with me, Discord will always be my fastest contact method as I practically live in here. No matter what you need, please feel free to reach out to me directly. 🙏",
      "",
      "You can interact with this message directly to view my Discord profile, or you can fill out the form below to automatically send me a friend request and message. Either way, I look forward to working with you soon! 🚀"
    ];
    
    // Start typing immediately when triggered
    setShowMessage(true);
    setMessageTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Start typing animation
    const fullText = fullMessage.join('\n');
    let currentIndex = 0;
    
    const typeMessage = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeMessage, 10); // 2x faster (20ms -> 10ms per character)
      }
    };
    
    // Small delay to let the typing indicator disappear first
    setTimeout(() => {
      setShowTyping(false);
      typeMessage();
    }, 100);
  }, [triggerTyping]);

  const TypingIndicator = () => (
    <motion.div
      className="flex items-center gap-2 px-4 py-1 text-[#949BA4] text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-1 h-1 bg-[#949BA4] rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4] 
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <span className="italic">PineFruit is typing...</span>
    </motion.div>
  );
  return (
    <motion.div
      className="bg-[#1A1A1E] rounded-lg overflow-hidden border border-white/10 shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Discord message content area - exact fixed height */}
      <div className="p-4" style={{ height: '200px' }}>
        <div className="flex items-start gap-3 h-full">
          {showMessage ? (
            <>
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <img 
                  src="https://cdn.discordapp.com/avatars/227292400307929088/44cb402145b72ff04ba976a34a8da577.png?size=64"
                  alt="PineFruit Discord Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for localhost - hide image and show initials
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-white font-bold text-sm">PF</span>';
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-base">PineFruit</span>
                  <span className="text-[#949BA4] text-xs">{messageTimestamp || '5:58 PM'}</span>
                </div>
                
                {/* Fixed height message content with enough space */}
                <div className="text-[#dcddde] text-sm leading-relaxed" style={{ height: '160px' }}>
                  <div className="whitespace-pre-wrap">
                    {typedText}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Empty space during typing phase - same height as message
            <div style={{ height: '180px', width: '100%' }} />
          )}
        </div>
      </div>

      {/* Typing indicator space - fixed height */}
      <div style={{ height: '32px' }} className="flex items-center">
        <AnimatePresence>
          {showTyping && (
            <TypingIndicator />
          )}
        </AnimatePresence>
      </div>
      
      {/* Discord Reply Area - always visible */}
      <DiscordReplyButton href="https://discord.com/users/227292400307929088" />
    </motion.div>
  );
};

export default DiscordMessagePreview;
