'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, LogOut, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useDiscordAuth } from '@/hooks/useDiscordAuth';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const DiscordMessaging: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout, sendMessage } = useDiscordAuth();
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSendStatus('sending');
    setSendError('');

    const result = await sendMessage(message.trim());

    if (result.success) {
      setSendStatus('success');
      setMessage('');
      // Reset status after 3 seconds
      setTimeout(() => setSendStatus('idle'), 3000);
    } else {
      setSendStatus('error');
      setSendError(result.error || 'Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // Login state
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-300">
                Connect your Discord account to send me a message directly
              </p>
              <Button
                size="lg"
                onClick={login}
                disabled={isLoading}
                loading={isLoading}
                icon={<MessageCircle className="w-5 h-5" />}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                {isLoading ? 'Connecting...' : 'Connect with Discord'}
              </Button>
              <p className="text-xs text-gray-500">
                Secure OAuth - we never store your credentials
              </p>
            </div>
          </motion.div>
        ) : (
          // Authenticated state
          <motion.div
            key="messaging"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* User info header */}
            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Connected as {user?.username || 'User'}</p>
                  <p className="text-green-400 text-sm">Ready to send message</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                icon={<LogOut className="w-4 h-4" />}
              >
                Disconnect
              </Button>
            </div>

            {/* Message form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="discord-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="discord-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tell me about your project, ask a question, or just say hello! (Ctrl/Cmd + Enter to send)"
                  rows={4}
                  maxLength={2000}
                  className={cn(
                    'w-full px-4 py-3 bg-gray-800 border rounded-lg resize-none transition-all duration-300',
                    'text-white placeholder-gray-500 focus:outline-none focus:ring-2',
                    'border-gray-600 focus:border-purple-500 focus:ring-purple-500/50'
                  )}
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Ctrl/Cmd + Enter to send
                  </p>
                  <p className="text-xs text-gray-500">
                    {message.length}/2000
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sendStatus === 'sending'}
                loading={sendStatus === 'sending'}
                size="lg"
                className="w-full"
                icon={<Send className="w-5 h-5" />}
              >
                {sendStatus === 'sending' ? 'Sending...' : 'Send to PineFruitDev'}
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
                    <p className="text-sm">
                      Message sent successfully! PineFruitDev will receive it as a Discord DM.
                    </p>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscordMessaging;


