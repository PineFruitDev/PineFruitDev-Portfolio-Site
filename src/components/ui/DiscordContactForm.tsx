'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { useDiscordAuth } from '@/hooks/useDiscordAuth';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const DiscordContactForm: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, sendMessage } = useDiscordAuth();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState('');

  const handleSendMessage = async () => {
    if (!title.trim() || !message.trim()) return;

    setSendStatus('sending');
    setSendError('');

    // Format the message as requested
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const siteName = siteUrl.includes('pinefruit.dev') ? 'PineFruit.dev' : 'Local Development';
    const formattedMessage = `## ${title}\n\n${message}\n\n*Automatically sent from [${siteName}](${siteUrl})*`;

    const result = await sendMessage(formattedMessage);

    if (result.success) {
      setSendStatus('success');
      setTitle('');
      setMessage('');
      // Reset status after 5 seconds
      setTimeout(() => setSendStatus('idle'), 5000);
    } else {
      setSendStatus('error');
      setSendError(result.error || 'Failed to send message');
    }
  };

  const isFormValid = title.trim().length >= 3 && message.trim().length >= 10;

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // Pre-auth form collection
          <motion.div
            key="pre-auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Message Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject/Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your project about?"
                  maxLength={100}
                  className={cn(
                    'w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300',
                    'text-white placeholder-gray-500 focus:outline-none focus:ring-2',
                    'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                  )}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {title.length}/100 characters
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, goals, timeline, or any questions you have..."
                  rows={4}
                  maxLength={1500}
                  className={cn(
                    'w-full px-4 py-3 bg-gray-800 border rounded-lg resize-none transition-all duration-300',
                    'text-white placeholder-gray-500 focus:outline-none focus:ring-2',
                    'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                  )}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {message.length}/1500 characters
                </div>
              </div>
            </div>

            {/* Send Button - triggers Discord auth */}
            <Button
              onClick={login}
              disabled={!isFormValid || isLoading}
              loading={isLoading}
              size="lg"
              className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              {isLoading ? 'Connecting...' : 'Send via Discord'}
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              <p>🔒 Discord OAuth Required</p>
            </div>
          </motion.div>
        ) : (
          // Post-auth confirmation
          <motion.div
            key="post-auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Connected status */}
            <div className="p-4 bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Connected as {user?.username}</p>
                  <p className="text-[#5865F2] text-sm">Ready to send message</p>
                </div>
              </div>
            </div>

            {/* Message preview */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Message to be sent:</p>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm">
                <div className="text-purple-400">## {title || '[Your Title]'}</div>
                <div className="text-gray-300 mt-2 whitespace-pre-wrap">
                  {message || '[Your message content]'}
                </div>
                <div className="text-blue-400 mt-3 text-xs">
                  {(() => {
                    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
                    const siteName = siteUrl.includes('pinefruit.dev') ? 'PineFruit.dev' : 'Local Development';
                    return `*Automatically sent from [${siteName}](${siteUrl})*`;
                  })()}
                </div>
              </div>
            </div>

            {/* Final send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!isFormValid || sendStatus === 'sending'}
              loading={sendStatus === 'sending'}
              size="lg"
              className="w-full"
              icon={<Send className="w-5 h-5" />}
            >
              {sendStatus === 'sending' ? 'Sending...' : 'Send Message & Add Friend'}
            </Button>

            {/* Status messages */}
            <AnimatePresence>
              {sendStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Message sent successfully!</p>
                    <p className="text-xs mt-1">PineFruitDev will receive your message as a Discord DM. Don't forget to accept the friend request!</p>
                  </div>
                </motion.div>
              )}

              {sendStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Failed to send message</p>
                    {sendError && <p className="text-xs mt-1">{sendError}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-xs text-gray-500 text-center">
              <UserPlus className="w-4 h-4 inline mr-1" />
              You'll be prompted to add PineFruitDev as a friend for ongoing communication
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscordContactForm;
