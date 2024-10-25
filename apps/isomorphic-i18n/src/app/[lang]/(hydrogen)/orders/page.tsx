'use client'
import { BadgeCent } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@public/assets/karam-el-sham.png';
import { routes } from '@/config/routes';
import Link from 'next/link';
import Title from '@/app/components/ui/title/Title';
import { Order } from '@/types';
import { API_BASE_URL } from '@/config/base-url';
import photo from '@public/assets/شاورما-عراقي-لحمة-مع-بطاطا.png'
import { EmptyProductBoxIcon } from 'rizzui';
import { useTranslation } from '@/app/i18n/client';
type OrdersProps = {
  id: string;
};

const Orders: React.FC =({lang}: { lang?: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const token =localStorage.getItem('Token')
  const { t } = useTranslation(lang!, 'order');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Order/GetAllUserOrders`, {
          headers: {
            'accept': '*/*',
            'refreshToken': `${token}`
          }
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <>
    {orders.length > 0?
      <div>
        <div className="w-5/6 mx-auto mt-10">
          <Title title="Orders" />
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="relative bg-slate-100 hover:bg-orange-50 transition-all duration-100 px-4 py-4 border rounded-lg mb-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h2 className="text-mainColor text-sm sm:text-base">Order ID: </h2>
                    <h2 className="text-mainColor text-sm sm:text-base">{order.id}</h2>
                  </div>
                  <h3 className="text-mainColor">${order.totalPrice}</h3>
                </div>
                <div className="py-5">
                  <div className="flex mt-3">
                    <p>Order date: </p>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex mt-3">
                    <p>total Choice Prices: </p>
                    <span>{order.totalChoicePrices}</span>
                  </div>
                  {order.items.map((i)=><>
                  
                  <div className="flex mt-3">
                    <p>quantity: </p>
                    <span>{i.quantity}</span>
                  </div>
                    <p>items: </p>
                  <div className="flex mt-3">
                    <div className="rounded-lg border border-dashed border-mainColor ">
                      <Image width={300} height={150} className='w-full h-20' src={photo} alt={i.product.name}/>
                    <span className='ms-1 mb-1'>{i.product.name}</span>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <p>Item price: </p>
                    <span>{i.itemPrice}</span>
                  </div>

                  </>)}
                </div>
                <div className="flex justify-between">
                  <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    <div className="flex w-fit items-center p-2 rounded-lg gap-2 border border-dashed border-orange-500">
                      <BadgeCent className="text-orange-500" />
                      <span className="text-xs font-light">Cash on delivery</span>
                    </div>
                  </div>
                  <div className="absolute end-3 bottom-4">
                    <Image width={60} height={60} src={Logo} alt="logo" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
    :
    <div className="w-5/6 m-auto mt-10">    
      <div className="flex flex-col justify-center items-center">
        <EmptyProductBoxIcon/>
        <p>{t('order-empty')}</p>
      </div>
    </div>  
  }
    </>
  
 
  );
}

export default Orders;
