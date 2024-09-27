import OrderTimeLine from '@/app/components/orderTimeLine/OrderTimeLine'
import OrderView from '@/app/shared/ecommerce/order/order-view'
import React from 'react'


function OrderId() {
  return <>
  {/* <OrderTimeLine statusDate={''} /> */}
  <div className="w-5/6 mx-auto">
    <OrderView/>
  </div>
  </>
}

export default OrderId