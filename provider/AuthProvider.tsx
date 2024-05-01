import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  signIn: (user: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);

  const signIn = (newUser: any) => {
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    signIn,
    signOut,
  };
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
