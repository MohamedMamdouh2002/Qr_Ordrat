'use client'
import React, { useEffect, useState } from 'react'
import Title from '../ui/title/Title'
import ProductFeed from '@/app/shared/ecommerce/shop/product-feed'
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/kfc-background.jpg'
import  Card  from '../ui/card/Card'
import { useUserContext } from '../context/UserContext'
import { AllCategories, Food, Product } from '@/types'
import Image from 'next/image'
import SmallCard from '../ui/smallCard/SmallCard'
import MediumCard from '../ui/mediumCard/MediumCard'
import photo from '@public/assets/WhatsApp Image 2024-09-27 at 08.32.14_0e7866cc.jpg'
type Props = { data?: AllCategories; initialCategory?: string };

function Grills({ data, initialCategory }: Props) {
  const { GetHome } = useUserContext();
  const [home, setHome] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHome();
      setHome(data)
      console.log('Fetched Data:', data);
      
    };

    fetchData();
  }, [GetHome]);
  

    // const [isScrollable, setIsScrollable] = useState(false);
  return <>
  <div className="">
    {home.map((sec)=>
    <div key={sec.id} id={sec.id} className="w-5/6 sm:w-[90%] mx-auto mt-20">
        <Title title={sec.name} />
        {sec.numberOfColumns !== 0 && sec.numberOfColumns !== 2 && (
          <>
          <div className=" relative">
            <Image
              id="offers"
              src={sec.bannerUrl}
              // layout='response'
              width={900}
              height={300}
              className="w-full  h-[240px] sm:h-[300px] object-cover -mb-28  relative rounded-lg "
              alt=""
              />
            <div className="absolute bottom-0  w-[100%] h-32 sm:h-32 bg-gradient-to-b from-transparent to-[rgba(255,255,255,1)]"></div>
            </div>
          </>
      )}
        <div className={sec.numberOfColumns === 0 ? ` grid lg:grid-cols-2  md:grid-cols-2 grid-cols-1 sm:gap-5 ` : sec.numberOfColumns === 2 ? ' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 ' : 'flex overflow-x-auto scrollbar-hide sm:gap-4 gap-2  '}>
          {sec.products.map((prod: React.JSX.IntrinsicAttributes & Food & { setCurrentItem: React.Dispatch<React.SetStateAction<{ type?: string; id: string } | null>> }) =>
          
            `${sec.numberOfColumns}` === '0' ? (
            <>
              <MediumCard key={prod.id} {...prod}  />
              <hr className='mt-1 sm:hidden '/>
            </>

              ) :`${sec.numberOfColumns}` === '2' ? (
                  <Card key={prod.id} {...prod} />
              ): (
                <>
                <div className="">
                    <SmallCard key={prod.id} {...prod} />     

                </div>
                </>
              )
          )}
        </div>
    </div>
    )}
  </div>
  </>
}
export default Grills