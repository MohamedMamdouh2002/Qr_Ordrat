import OrderView from '@/app/shared/ecommerce/order/order-view'
import React from 'react'


const OrderId: React.FC =({lang}: { lang?: string }) => {
  return <>
  <div className="w-5/6 mx-auto">
    <OrderView lang={lang}/>
  </div>
  </>
}

export default OrderId