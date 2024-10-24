'use client'
import React, { useEffect, useRef, useState } from 'react';
import Title from '../ui/title/Title'
import Image from 'next/image'
import SmallCard from '../ui/smallCard/SmallCard'
import MediumCard from '../ui/mediumCard/MediumCard'
import Card from '../ui/card/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useUserContext } from '../context/UserContext'
import { AllCategories, Food } from '@/types'
import { Swiper as SwiperType } from 'swiper';
import PrevArrow from '../PrevArrow'
import NextArrow from '../NextArrow'
import Link from 'next/link';

type Props = { data?: AllCategories; initialCategory?: string };

function Grills({ data, initialCategory }: Props) {
  const { GetHome } = useUserContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [home, setHome] = useState<any[]>([])
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHome();
      setHome(data)
      console.log('Fetched Data:', data);
    };

    fetchData();
  }, [GetHome]);
  
  return (
    <div className="">
      {home?.map((sec) => (
        <div key={sec.id} id={sec.id} className="w-5/6 sm:w-[90%] mx-auto mt-20">
          <div className="flex justify-between items-center">
          <Title title={sec.name} />
          <Link href={`/product/${sec.id}`}>
            <p>View All</p>
          </Link>
          </div>
          {sec.numberOfColumns !== 0 && sec.numberOfColumns !== 2 && sec.numberOfColumns !== 1 && (
            <>
              <div className="relative">
                <Image
                  id="offers"
                  src={sec?.bannerUrl}
                  width={900}
                  height={300}
                  className="w-full h-[240px] sm:h-[300px] object-cover -mb-28 relative rounded-lg"
                  alt=""
                />
                <div className="absolute bottom-0 w-[100%] h-32 sm:h-32 bg-gradient-to-b from-transparent to-[rgba(255,255,255,1)]"></div>
              </div>
            </>
          )}
          
          <div className={sec.numberOfColumns === 1 ? `grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:gap-5` : sec.numberOfColumns === 2 ? 'grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5' : 'sm:gap-4 gap-2'}>
            {sec.numberOfColumns === 3 ? (
              <>
              <div className="relative">
                {currentSlide > 0 && (
                    <div className="absolute top-[50%] right-0 z-10">
                      <PrevArrow onClick={() => swiperRef.current?.slidePrev()} />
                    </div>
                )}
                {currentSlide < sec.products.length - 5 && ( 
                  <div className="absolute top-[50%] left-0 z-10">
                    <NextArrow onClick={() => swiperRef.current?.slideNext()} />
                  </div>
                )}
                <Swiper 
                  spaceBetween={28} 
                  slidesPerView={6}
                  onSwiper={(swiper) => (swiperRef.current = swiper)} 
                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)} 
                  breakpoints={{
                    0: {
                        slidesPerView: 2.5,
                        slidesPerGroup: 1,
                    },
                    500: {
                        slidesPerView: 3.60,
                        slidesPerGroup: 1,
                    },
                    640: {
                        slidesPerView: 4.30,
                        slidesPerGroup: 1,
                    },
                    768: {
                        slidesPerView: 4.30,
                        slidesPerGroup: 1,
                    },
                    840: {
                        slidesPerView: 4.70,
                        slidesPerGroup: 1,
                    },
                    1024: {
                        slidesPerView: 4.30,
                        slidesPerGroup: 1,
                    },
                    1280: {
                        slidesPerView: 6,
                        slidesPerGroup: 1,
                    },
                    2500: {
                        slidesPerView: 8,
                        slidesPerGroup: 1,
                    },
                }}
                >
                  {sec.products.map((prod: React.JSX.IntrinsicAttributes & Food & { setCurrentItem: React.Dispatch<React.SetStateAction<{ type?: string; id: string } | null>> }) =>

                    <SwiperSlide key={prod.id}>
                      <SmallCard  {...prod} />
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              </>
            ) : (
              sec.products.map((prod: React.JSX.IntrinsicAttributes & Food & { setCurrentItem: React.Dispatch<React.SetStateAction<{ type?: string; id: string } | null>> }) =>
                sec.numberOfColumns === 1 ? (
                  <>
                    <MediumCard key={prod.id} {...prod} />
                    <hr className='mt-1 sm:hidden'/>
                  </>
                ) : (
                  <Card key={prod.id} {...prod} />
                )
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Grills;
