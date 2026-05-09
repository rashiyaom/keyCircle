import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, name: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Dummy credentials
const DUMMY_CREDENTIALS = {
  email: "demo@keycircle.com",
  password: "Demo123!"
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dummyUser');
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    
    if (savedUser && sessionExpiry) {
      const expiryTime = parseInt(sessionExpiry);
      const currentTime = Date.now();
      
      // Check if session is still valid (24 hours)
      if (currentTime < expiryTime) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse saved user:', error);
          localStorage.removeItem('dummyUser');
          localStorage.removeItem('sessionExpiry');
        }
      } else {
        // Session expired, clear storage
        localStorage.removeItem('dummyUser');
        localStorage.removeItem('sessionExpiry');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Check dummy credentials
    if (email.trim() === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      const newUser: User = {
        email: DUMMY_CREDENTIALS.email,
        name: "Demo User",
        id: "dummy-user-123"
      };
      
      // Set session expiry to 24 hours from now
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      
      // Save to localStorage
      localStorage.setItem('dummyUser', JSON.stringify(newUser));
      localStorage.setItem('sessionExpiry', expiryTime.toString());
      
      setUser(newUser);
      return true;
    }
    
    return false;
  };

  const signup = (email: string, name: string): void => {
    const newUser: User = {
      email: email,
      name: name,
      id: `user-${Date.now()}`
    };
    
    // Set session expiry to 24 hours from now
    const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
    
    // Save to localStorage
    localStorage.setItem('dummyUser', JSON.stringify(newUser));
    localStorage.setItem('sessionExpiry', expiryTime.toString());
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dummyUser');
    localStorage.removeItem('sessionExpiry');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
