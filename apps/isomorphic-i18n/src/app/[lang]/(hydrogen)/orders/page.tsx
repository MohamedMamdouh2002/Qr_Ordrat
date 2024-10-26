'use client'
import React from 'react';
import Order from '@/app/components/order/MyOrder';
type OrdersProps = {
  id: string;
};

const Orders: React.FC =({lang}: { lang?: string }) => {

  return (
  <Order lang={lang!}/>

  );
}

export default Orders;
