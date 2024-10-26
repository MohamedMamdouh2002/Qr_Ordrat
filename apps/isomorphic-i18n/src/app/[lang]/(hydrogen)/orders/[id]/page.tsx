import OrderView from '@/app/shared/ecommerce/order/order-view'
import React from 'react'


function OrderId({
  params: { lang },
}: {
  params: {
    lang: string;
  };
})  {
  return <>
  <div className="w-5/6 mx-auto">
    <OrderView lang={lang}/>
  </div>
  </>
}

export default OrderId