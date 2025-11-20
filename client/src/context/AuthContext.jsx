import React, { createContext, useState, useEffect } from 'react';
import { login, signup, getProfile } from '../api/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on mount and fetch user profile
    const token = localStorage.getItem('authToken');
    if (token) {
      getProfile()
        .then((data) => {
          setUser(data.user);
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem('authToken', data.token);
    setUser(data.user);
    return data.user;
  };

  const handleSignup = async (userData) => {
    const data = await signup(userData);
    localStorage.setItem('authToken', data.token);
    setUser(data.user);
    return data.user;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};