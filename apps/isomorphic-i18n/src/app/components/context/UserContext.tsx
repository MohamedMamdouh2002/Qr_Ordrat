'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FaqType = {
  name: string;
  faQs: { question: string; answer: string }[];
};

type UserContextType = {
  userData: boolean;
  setUserData: React.Dispatch<React.SetStateAction<boolean>>;
  faqs: FaqType[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqType[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  
  return (
    <UserContext.Provider value={{ userData, setUserData, faqs, setFaqs }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
