"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define types for AuthContext
interface AuthContextType {
  user: any; // Replace with the appropriate type for your user session
  setUser: (user: any) => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  const [user, setUser] = useState(session); // Initialize with session from server

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
