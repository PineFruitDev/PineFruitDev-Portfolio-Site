'use client';

import { useState, useEffect } from 'react';

interface DiscordUser {
  id: string;
  username: string;
  avatar?: string;
}

interface UseDiscordAuthReturn {
  user: DiscordUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  sendMessage: (message: string) => Promise<{ success: boolean; error?: string }>;
}

const DISCORD_API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://pines-contact-bot.pinefruit.workers.dev'
  : 'http://localhost:8787';

export const useDiscordAuth = (): UseDiscordAuthReturn => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Check for auth success in URL on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authSuccess = urlParams.get('discord_auth');
      
      if (authSuccess === 'success') {
        const token = urlParams.get('session_token');
        const userId = urlParams.get('user_id');
        const username = urlParams.get('username');
        
        if (token && userId && username) {
          setSessionToken(token);
          setUser({ id: userId, username });
          
          // Clean up URL
          const cleanUrl = window.location.pathname + window.location.hash.replace('#discord-auth-success', '');
          window.history.replaceState({}, '', cleanUrl);
        }
      } else if (authSuccess === 'error') {
        // Discord authentication failed - silently handle
        // Clean up URL
        const cleanUrl = window.location.pathname + window.location.hash.replace('#discord-auth-error', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    };

    checkAuthCallback();
  }, []);

  const login = () => {
    if (typeof window === 'undefined') return;
    
    setIsLoading(true);
    window.location.href = `${DISCORD_API_BASE}/auth/discord`;
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    setIsLoading(false);
  };

  const sendMessage = async (message: string): Promise<{ success: boolean; error?: string }> => {
    if (!user || !sessionToken) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${DISCORD_API_BASE}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken,
          message,
          userId: user.id,
          username: user.username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      return { success: true };
    } catch (error) {
      // Silently handle send message error
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    sendMessage,
  };
};



