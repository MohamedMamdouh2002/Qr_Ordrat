import { BadgeCent } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Logo from '@public/assets/karam-el-sham.png';
import { routes } from '@/config/routes';
import Link from 'next/link';
type OrdersProps = {
  id: string; // تحديد النوع المناسب لـ id
};
function Orders ( )  {
  return (
    <div>
      <Link href={`orders/id`}>
        <div className="w-5/6 mx-auto relative bg-slate-100 hover:bg-orange-50 transition-all duration-100 px-4 py-4 border rounded-lg mt-10">
          <div className="flex justify-between">
            <h2 className='text-mainColor'>Order 1</h2>
            <h3 className='text-mainColor'>$250</h3>
          </div>
          <div className="py-5">
            <div className="flex mt-3">
              <p>Track ID: </p>
              <span> fadfa-geffax-24edcda-3efsd-esffa</span>
            </div>
            <div className="flex mt-3">
              <p>Order date: </p>
              <span> 22 years</span>
            </div>
            <div className="flex mt-3">
              <p>Address:</p>
              <span> 2, 2, eshreen st faisal</span>
            </div>
            <div className="flex mt-3">
              <p>Phone:</p>
              <span> 01255671304</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex w-fit items-center p-2 rounded-lg gap-2 border border-dashed border-orange-500">
                <BadgeCent className="text-orange-500" />
                <span className='text-xs font-light'>Cash on delivery</span>
              </div>
              <div className="flex w-fit items-center p-2 rounded-lg gap-2 border border-dashed border-orange-500">
                <BadgeCent className="text-orange-500" />
                <span className='text-xs font-light'>Cash on delivery</span>
              </div>
              <div className="flex w-fit items-center p-2 rounded-lg gap-2 border border-dashed border-orange-500">
                <BadgeCent className="text-orange-500" />
                <span className='text-xs font-light'>Cash on delivery</span>
              </div>
            </div>

            <div className="absolute end-3 bottom-4">
              <Image width={60} height={60} src={Logo} alt="logo" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Orders;
