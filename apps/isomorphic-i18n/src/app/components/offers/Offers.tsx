import React from 'react'
import SmallCard from '../ui/smallCard/SmallCard'
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/Offers.png'
import Image from 'next/image'
function Offers() {
  return <>
  <div className="">
    <Image id='offers' src={slider} width={900} height={600} className='w-full  relative h-[400px] rounded-lg '  alt=''/>
    <div className="absolute">

        <div className="w-[90%] grid grid-cols-8 mx-auto -mt-20 ">
                <SmallCard
                name="Product Name"
                description="This is a great productwwwwwww kksjl."
                price={100}
                newtrend="most selling"
                sale_price={80} // هذا اختياري
                className="" 
                photo={sliderPhoto.src}/>
                <SmallCard
                name="Product Name"
                description="This is a great productwwwwwww kksjl."
                price={100}
                newtrend="most selling"
                sale_price={80} // هذا اختياري
                className="" 
                photo={sliderPhoto.src}/>
                <SmallCard
                name="Product Name"
                description="This is a great productwwwwwww kksjl."
                price={100}
                newtrend="most selling"
                sale_price={80} // هذا اختياري
                className="" 
                photo={sliderPhoto.src}/>
                <SmallCard
                name="Product Name"
                description="This is a great productwwwwwww kksjl."
                price={100}
                newtrend="most selling"
                sale_price={80} // هذا اختياري
                className="" 
                photo={sliderPhoto.src}/>
                    <SmallCard
                    name="Product Name"
                    description="This is a great productwwwwwww kksjl."
                    price={100}
                    newtrend="most selling"
                    sale_price={80} // هذا اختياري
                    className="" 
                    photo={sliderPhoto.src}/>
            
        </div>
    </div>
  </div>
  </>
}

export default Offers