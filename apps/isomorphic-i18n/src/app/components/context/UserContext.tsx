'use client';

import { AllCategories, Food, FoodId, Review } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FaqType = {
  name: string;
  faQs: { question: string; answer: string }[];
};

type UserContextType = {

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  GetHome: () => Promise<AllCategories | any>; 
  GetProduct: (id: string) => Promise<FoodId | any>; 
  GetRewiew:()=>  Promise<Review | any>;

  userData: boolean;
  setUserData: React.Dispatch<React.SetStateAction<boolean>>;
  faqs: FaqType[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqType[]>>;

};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<number>(0);
  const [userData, setUserData] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
    
  async function GetHome() {
    try {
      const response = await fetch(`https://testapi.ordrat.com/api/Category/GetAll/90918974-8C68-4E4B-9718-4B08FFD887AC`, {
        method: 'GET',
        headers: {
          'Accept-Language': 'en',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: AllCategories = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  }

  async function GetProduct(id: string) {
    try {
      const response = await fetch(`https://testapi.ordrat.com/api/Products/GetById/90918974-8C68-4E4B-9718-4B08FFD887AC/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data:FoodId = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  }
  async function GetRewiew() {
    try {
      const response = await fetch(`https://testapi.ordrat.com/api/Review/GetShopReviews/90918974-8C68-4E4B-9718-4B08FFD887AC?pageNumber=1&pageSize=50`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data:Review = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  return (
    <UserContext.Provider value={{ userData, setUserData, faqs, setFaqs, page, setPage, GetHome, GetProduct ,GetRewiew }}>
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
