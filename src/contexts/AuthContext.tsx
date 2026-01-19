import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { syncUserToSupabase, User } from '../lib/supabase';

import { zoServer } from '../lib/axios';

export interface AuthUser {
  id: string;
  mobile_number?: string;
  mobile_country_code?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  cachedUser: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  login: (user: AuthUser, token: string, validTill: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cachedUser, setCachedUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('zo_token');
      // If we have a token, verify it with the backend
      if (storedToken) {
        // Also check expiry locally first to save a request if obviously expired?
        // But user asked to use endpoints.

        // Use zoServer to ensure headers (client-key) and credentials are sent
        // Note: zoServer.get returns the data directly if configured, or response object.
        // Standard axios returns response object.
        const response = await zoServer.get('/auth/login/check', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          }
        });

        // If successful (axios throws on 4xx/5xx by default unless validatedStatus changed)
        // or interceptor catches 401.

        if (response.status === 200) {
          // If check passes, we keep the session active
          const storedUser = localStorage.getItem('zo_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          setToken(storedToken);
          console.log('Session verified with backend.');
        }
      } else {
        // No token, maybe we have a refresh token in httpOnly cookie?
        // Try refreshing just in case
        await refreshToken();
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      // If error is 401, interceptor might have handled it, or we try refresh
      if (error.response?.status !== 401) {
        // If 401, checkAuth might mean token invalid, so try refresh?
        // But our interceptor redirects on 401.
        // Ideally for checkAuth we want to try refresh instead of hard redirect.
        // But let's assume if check fails, we try refresh.
        await refreshToken();
      } else {
        // If 401, maybe try refresh explicitly?
        await refreshToken();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('zo_token');
      const headers: any = {};
      if (storedToken) {
        headers['Authorization'] = `Bearer ${storedToken}`;
      }

      const response = await zoServer.post('/auth/login/refresh', {}, {
        headers
      });

      if (response.status === 200) {
        const data = response.data;
        // Assuming data.token and data.user or similar
        if (data.token) {
          const validTill = Date.now() + (24 * 60 * 60 * 1000); // Default 24h if not provided
          login(data.user || user, data.token, data.valid_till || validTill);
          console.log('Token refreshed successfully.');
        }
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      logout();
    }
  }, [user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (userData: AuthUser, authToken: string, validTill: number) => {
    // Convert seconds to milliseconds if needed
    // Timestamps in seconds are < 1 trillion (1e12), timestamps in ms are >= 1 trillion
    let validTillMs = validTill;
    if (validTill < 1e12) {
      validTillMs = validTill * 1000;
    }

    setUser(userData);
    setToken(authToken);

    localStorage.setItem('zo_token', authToken);
    localStorage.setItem('zo_user', JSON.stringify(userData));
    localStorage.setItem('zo_token_valid_till', validTillMs.toString());

    console.log('Login successful, token valid until:', new Date(validTillMs).toISOString(), 'User:', userData.id || userData.mobile_number);

    // Sync to Supabase
    setIsSyncing(true);
    try {
      const result = await syncUserToSupabase(userData, authToken, validTill);
      if (result.success && result.data) {
        setCachedUser(result.data);
        console.log('User synced to Supabase successfully');
      }
    } catch (err) {
      console.error('Error syncing user:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCachedUser(null);

    localStorage.removeItem('zo_token');
    localStorage.removeItem('zo_user');
    localStorage.removeItem('zo_token_valid_till');
  };

  return (
    <AuthContext.Provider value={{
      user,
      cachedUser,
      token,
      isLoggedIn: !!user && !!token,
      isLoading,
      isSyncing,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
