'use client'
import Image from 'next/image';
import React from 'react'
import Slider from 'react-slick';
import sliderPhoto from '@public/assets/Web-00h-1.jpg'
import sliderPhoto1 from '@public/assets/9175da.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type images={
    img:any
}
const Photos=[
    {img:sliderPhoto},
    {img:sliderPhoto1},
  
]
function MainSlider() {
    const settings = {
        className: "",
        dots: true,
        speed: 500,
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
      };
  return <>
<div className="slider-container w-5/6 lg:w-[750px] cursor-grab border-none mt-10 mx-auto relative">
    <Slider {...settings}>
        {Photos.map((photo, index) => (
            <div key={index}>
                <Image 
                    src={photo.img} 
                    alt='slider' 
                    className='h-[150px] sm:h-[300px] overflow-hidden image rounded-xl px-1 pointer-events-none' // استخدم rounded-lg هنا
                />
            </div>
        ))}
    </Slider>
</div>

  </>
}

export default MainSlider