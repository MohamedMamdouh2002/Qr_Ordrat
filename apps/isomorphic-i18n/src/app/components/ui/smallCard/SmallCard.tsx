import React from 'react'
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/kfc-background.jpg'
import Image from 'next/image'
import { Title, Text, Button } from 'rizzui';

type ProductProps = {
    name: string;
    description: string;
    price: number;
    sale_price?: number;
    newtrend?:string;
    className?: string;
    photo:any;
  };
function SmallCard({ name, description, price, sale_price , newtrend , className ,photo }: ProductProps) {
  return<>

  <div className="grid grid-cols-8 ">

    <div className="col-span-8  ">

    <div className="relative">

        <Image src={photo} width={300} height={100} className='w-[150px] h-[150px] rounded-lg relative'  alt=''/>
        <div className="absolute bottom-1 start-1 w-10 h-10 bg-yellow-50 rounded-lg flex justify-center items-center text-3xl text-orange-500">
            +
        </div>
    </div>
    <Title
          as="h6"
          className="mb-1 text-sm truncate font-semibold transition-colors group-hover:text-mainColor"
        >
          {name} {/* تم استخدام name هنا */}
    </Title>

    <Text as="p" className="truncate text-sm pe-6">
        {description}
    </Text>
    <div className="mt-2 flex items-center font-semibold text-mainColor  ">
        <span>EGP {price}</span>
            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                EGP {sale_price}
            </del>
        
    </div>
    </div>

  </div>
  </>
}

export default SmallCard