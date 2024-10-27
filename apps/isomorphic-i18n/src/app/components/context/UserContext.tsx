'use client';

import { API_BASE_URL } from '@/config/base-url';
import { shopId } from '@/config/shopId';
import { AllCategories, Food, FoodId, Order, Review } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FaqType = {
  name: string;
  faQs: { question: string; answer: string }[];
};

type UserContextType = {

  page: number;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>; 
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>; 
  orderNote: string;
  setOrderNote: React.Dispatch<React.SetStateAction<string>>; 
  copone: string | null;
  setCopone: React.Dispatch<React.SetStateAction<string | null>>; 
  profileUserName: string;
  setProfileUserName: React.Dispatch<React.SetStateAction<string>>; 
  setPage: React.Dispatch<React.SetStateAction<number>>;
  GetHome: () => Promise<AllCategories | any>; 
  GetProduct: (id: string) => Promise<FoodId | any>; 
  GetRewiew:()=>  Promise<Review | any>;
  
  userData: boolean;
  setUserData: React.Dispatch<React.SetStateAction<boolean>>;
  updateAddresses: boolean;
  setUpdateAddresses: React.Dispatch<React.SetStateAction<boolean>>;
  faqs: FaqType[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqType[]>>;
  updatefaqs: boolean;
  setUpdateFaqs: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order[];
  setOrder: React.Dispatch<React.SetStateAction<Order[]>>;
  product: string[];
  setProduct: React.Dispatch<React.SetStateAction<string[]>>;

};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [orderNote, setOrderNote] = useState<string>('');
  const [copone, setCopone] = useState<string | null>(null);
  const [profileUserName, setProfileUserName] = useState<string>('User Name');
  const [userData, setUserData] = useState<boolean>(false);
  const [updateAddresses, setUpdateAddresses] = useState<boolean>(false);
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [updatefaqs, setUpdateFaqs] = useState<boolean>(false);
    
  async function GetHome() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Category/GetAll/${shopId}`, {
        method: 'GET',
        headers: {
          'Accept-Language': 'en',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      // استرجاع البيانات
      const data: AllCategories[] = await response.json();
  
      // const ids = data.map(category => category.id);
      // setProduct(ids); // تخزين البيانات في setProduct
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  }

  async function GetProduct(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Products/GetById/${shopId}/${id}`,{
        headers: {
          'Accept-Language': `en`,
          },
      });
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
      const response = await fetch(`${API_BASE_URL}/api/Review/GetShopReviews/${shopId}?pageNumber=1&pageSize=50`, {
        method: 'GET',
        headers: {
          'Accept-Language': 'en',
        },
      });
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
    <UserContext.Provider value={{product,setProduct,order,setOrder,token,setToken, orderNote, setOrderNote, copone, setCopone, profileUserName, setProfileUserName, accessToken,setAccessToken, userData, setUserData, updateAddresses, setUpdateAddresses, faqs, setFaqs, updatefaqs, setUpdateFaqs, page, setPage, GetHome, GetProduct ,GetRewiew }}>
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
