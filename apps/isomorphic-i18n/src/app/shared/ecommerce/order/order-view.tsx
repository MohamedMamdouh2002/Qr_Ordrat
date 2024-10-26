'use client';

import Image from 'next/image';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { PiCheckBold } from 'react-icons/pi';
import { useParams } from 'next/navigation'; 

import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import OrderViewProducts from '@/app/shared/ecommerce/order/order-products/order-view-products';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { toCurrency } from '@utils/to-currency';
import { formatDate } from '@utils/format-date';
import usePrice from '@hooks/use-price';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { BadgeCent } from 'lucide-react';
import { useTranslation } from '@/app/i18n/client';
import { API_BASE_URL } from '@/config/base-url';



const transitions = [
  {
    id: 1,
    paymentMethod: {
      name: 'Cash on delivery',
      image:<BadgeCent className="text-orange-500" />
    },
    // price: '$1575.00',
  },
  // {
  //   id: 2,
  //   paymentMethod: {
  //     name: 'PayPal',
  //     image:
  //       'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/paypal.png',
  //   },
  //   price: '$75.00',
  // },
  // {
  //   id: 2,
  //   paymentMethod: {
  //     name: 'Stripe',
  //     image:
  //       'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/stripe.png',
  //   },
  //   price: '$375.00',
  // },
];


function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
        >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
        >
        {children}
      </div>
    </div>
  );
}

export default function OrderView({lang}:{lang:string}) {
  const { items, total, totalItems } = useCart();
  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  const orderNote = useAtomValue(orderNoteAtom);
  const billingAddress = useAtomValue(billingAddressAtom);
  const shippingAddress = useAtomValue(shippingAddressAtom);
  const [order, setOrder] = useState<Order | null>(null);
	const { t } = useTranslation(lang! ,'order');
  
  const [currentOrderStatus, setCurrentOrderStatus] = useState<number>();
  // const currentOrderStatus = order?.status;
  const { id } = useParams();
  const phone=localStorage.getItem('phoneNumber')
  const orderStatus = [
    { id: 0, label: `${t('cancel')}` },
    { id: 1, label: `${t('Pending')}` },
    { id: 2, label: `${t('being-prepared')}` },
    { id: 3, label: `${t('being-delivered')}` },
    { id: 4, label: `${t('delivered')}` },
  ];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/Order/GetById/${id}`,
          {
            method: 'GET',
            headers: {
              'Accept-Language': lang,
              'Accept': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data: Order = await response.json();
        setCurrentOrderStatus(data?.status); 

        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);
  return (
    <div className="@container mb-5">
      <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {/* October 22, 2022 at 10:30 pm */}
          <div>
            {t('ordered-At')}: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'N/A'}
          </div>
        </span>
        {/* <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {totalItems} Items
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          Total {totalPrice}
        </span>
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-green-lighter px-2.5 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
          Paid
        </span> */}
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          {orderNote && (
            <div className="">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Notes About Order
              </span>
              <div className="rounded-xl border border-muted px-5 py-3 text-sm leading-[1.85]">
                {orderNote}
              </div>
            </div>
          )}

          <div className="pb-5">
            <OrderViewProducts lang={lang} />
            <div className="border-t border-muted pt-7 @5xl:mt-3">
            <div className="ms-auto max-w-lg space-y-6">
                <div className="flex justify-between font-medium">
                  {t('Subtotal')} <span>{order?.totalPrice}</span>
                </div>
                <div className="flex justify-between font-medium">
                  {t('Shipping-Fees')} <span>{order?.shippingFees}</span>
                </div>
                <div className="flex justify-between font-medium">
                  {t('Vat')} <span>{order?.totalVat}</span>
                </div>
                <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                  {t('Total')} <span>{toCurrency((order?.totalPrice || 0) + (order?.shippingFees || 0) + (order?.totalVat || 0))}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Title
              as="h3"
              className="mb-3.5  text-base font-semibold @5xl:mb-5 @7xl:text-lg"
            >
              {t('Transactions')}
            </Title>

            <div className="space-y-4">
              {transitions.map((item) => (
                <div
                  key={item.paymentMethod.name}
                  className="flex items-center border-dashed border-mainColor justify-between rounded-lg border px-5 py-5 font-medium shadow-sm transition-shadow @5xl:px-7"
                >
                  <div className="flex w-1/3 items-center">
                    <div className="shrink-0">
                      {/* <Image
                        src={item.paymentMethod.image}
                        alt={item.paymentMethod.name}
                        height={60}
                        width={60}
                        className="object-contain"
                      /> */}{item.paymentMethod.image}
                    </div>
                    <div className="flex flex-col ps-4">
                      <Text as="span" className="font-lexend text-gray-700">
                        {t('Payment')}
                      </Text>
                      <span className="pt-1 text-[13px] font-normal text-gray-500">
                        {item.paymentMethod.name}
                      </span>
                    </div>
                  </div>

                  {/* <div className="w-1/3 text-end">{item.price}</div> */}
                </div>
              ))}
            </div>
          </div>

          <div className="">
            {/* <div className="mb-3.5 @5xl:mb-5">
              <Title as="h3" className="text-base font-semibold @7xl:text-lg">
                Balance
              </Title>
            </div> */}
            {/* <div className="space-y-6 rounded-xl border border-muted px-5 py-6 @5xl:space-y-7 @5xl:p-7">
              <div className="flex justify-between font-medium">
                Total Order <span>$5275.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Total Return <span>$350.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Paid By Customer <span>$3000.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Refunded <span>$350.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Balance <span>$4975.00</span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title={t('Order-Status')}
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
  {/* عرض حالة الـ id === 0 فقط إذا كان currentOrderStatus === 0 */}
              {currentOrderStatus === 0 &&
                orderStatus
                  .filter((item) => item.id === 0)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:bg-gray-100 last:after:hidden",
                        'text-red-500 before:bg-red-500' // تنسيق مخصص لـ id === 0
                      )}
                    >
                        
                        <span className="absolute -start-1.5 top-1 text-white">
                          <PiCheckBold className="h-auto w-3" />
                        </span>
                    
                      {item.label}
                    </div>
                  ))}

              {/* عرض الحالات من id === 1 إلى id === 4 فقط إذا كان currentOrderStatus !== 0 */}
              {currentOrderStatus !== 0 &&
                orderStatus
                  .filter((item) => item.id !== 0)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:bg-gray-100 last:after:hidden",
                        (currentOrderStatus ?? 1) >= item.id
                          ? 'before:bg-teal-500 after:bg-teal-500' // باقي الحالات
                          : 'after:hidden', // إخفاء after للحالات الأخرى
                        currentOrderStatus === item.id && 'before:bg-teal-500 after:hidden' // الحالة الحالية
                      )}
                    >
                      {(currentOrderStatus ?? 0) >= item.id && item.id !== 0 ? (
                        <span className="absolute -start-1.5 top-1 text-white">
                          <PiCheckBold className="h-auto w-3" />
                        </span>
                      ) : null}

                      {item.label}
                    </div>
                  ))}
            </div>
          </WidgetCard>

          <WidgetCard
            title={t('Customer-Details')}
            childrenWrapperClass="py-5 @5xl:py-8 flex items-center"
          >
            <div className="relative aspect-square h-16 w-16 shrink-0 @5xl:h-20 @5xl:w-20">
              <Image
                fill
                alt="avatar"
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw"
                src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
              />
            </div>
            <div className="ps-4 @5xl:ps-6">
              {/* <Title
                as="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                Leslie Alexander
              </Title> */}
              {/* <Text as="p" className="mb-2 break-all last:mb-0">
                nevaeh.simmons@example.com
              </Text> */}
              <Text as="p" className="mb-2 last:mb-0 font-semibold">
                {t('Phone')}
              </Text>
              <Text as="p" className="mb-2 last:mb-0 font-semibold">
                {phone}
              </Text>
            </div>
          </WidgetCard>

          <WidgetCard
            title={t('Shipping-Address')}
            childrenWrapperClass="@5xl:py-6 py-5"
          >
           {order?.address && (
              <div key={order.address.id}>
                <Title as="h3" className="mb-2.5 text-base font-semibold @7xl:text-lg">
                  {t('Apartment')} {order.address.apartmentNumber}
                  <br/>
                  {t('Floor')} {order.address.floor}
                  <br/>
                   {t('Street')} {order.address.street}, 
                </Title>
                <Text as="p" className="mb-2 leading-loose last:mb-0">
                  {order.address.additionalDirections}
                </Text>
              </div>
            )}
          </WidgetCard>
          {!isEmpty(shippingAddress) && (
            <WidgetCard
              title="Billing Address"
              childrenWrapperClass="@5xl:py-6 py-5"
            >
              <Title
                as="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                {shippingAddress?.customerName}
              </Title>
              <Text as="p" className="mb-2 leading-loose last:mb-0">
                {shippingAddress?.street}, {shippingAddress?.city},{' '}
                {shippingAddress?.state}, {shippingAddress?.zip},{' '}
                {shippingAddress?.country}
              </Text>
            </WidgetCard>
          )}
        </div>
      </div>
    </div>
  );
}
