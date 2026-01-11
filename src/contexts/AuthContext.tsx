import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { syncUserToSupabase, User } from '../lib/supabase';

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

  useEffect(() => {
    const storedToken = localStorage.getItem('zo_token');
    const storedUser = localStorage.getItem('zo_user');
    const storedValidTill = localStorage.getItem('zo_token_valid_till');

    console.log('Auth check - stored token:', !!storedToken, 'stored user:', !!storedUser, 'valid_till:', storedValidTill);

    if (storedToken && storedUser) {
      // If no valid_till, assume session is valid for now
      let isValid = true;
      
      if (storedValidTill) {
        let validTill = parseInt(storedValidTill);
        const now = Date.now();

        // Convert seconds to milliseconds if needed
        // Timestamps in seconds are < 1 trillion (1e12), timestamps in ms are >= 1 trillion
        if (validTill < 1e12) {
          validTill = validTill * 1000;
        }

        console.log('Token valid until:', new Date(validTill).toISOString(), 'Now:', new Date(now).toISOString());
        isValid = now < validTill;
      }

      if (isValid) {
        setToken(storedToken);
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('Session restored for user:', parsedUser.id || parsedUser.mobile_number);
        } catch {
          localStorage.removeItem('zo_user');
        }
      } else {
        console.log('Session expired, clearing...');
        localStorage.removeItem('zo_token');
        localStorage.removeItem('zo_user');
        localStorage.removeItem('zo_token_valid_till');
      }
    }
    setIsLoading(false);
  }, []);

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
