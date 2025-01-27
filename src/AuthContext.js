import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Auth context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role')); 
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !role || !email) {
      return; // Skip updates if any of these values are missing
    }
    // No need to call setRole and setEmail here since they are already set
  }, [token, role, email]);

  const login = (token, role, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Store role in localStorage
    localStorage.setItem('email',email);

    setToken(token);
    setRole(role);
    setEmail(email);

  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setToken(null);
    setRole(null);
    setEmail(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{token, role,email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  return <AuthProviderComponent>{children}</AuthProviderComponent>;
};
export default AuthProvider;