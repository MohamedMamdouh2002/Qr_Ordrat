'use client'
import React from 'react'
import Title from '../ui/title/Title'
import ProductFeed from '@/app/shared/ecommerce/shop/product-feed'
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/kfc-background.jpg'
import  Card  from '../ui/card/Card'

function Grills() {
    type images={
        img:any
    }
    const Photos=[
        {img:"ssss"},
        {img:"ssss"},
        {img:"ssss"},
        {img:"ssss"},
    ]
  return <>
    <div id="grills" className="w-5/6 sm:w-[90%] mx-auto mt-20">
        <Title title='Grills' />
  
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 mt-10 ">

          <Card
            name="Product Name"
            description="This is a great product."
            price={100}
            newtrend="most selling"
            sale_price={80} // هذا اختياري
            className="" 
            photo={sliderPhoto.src}
          />
          <Card
            name="Product Name"
            description="This is a great product."
            price={100}
            newtrend="most selling"
            sale_price={80} // هذا اختياري
            className="" 
            photo={slider.src}
          />
          <Card
            name="Product Name"
            description="This is a great product."
            price={100}
            newtrend="most selling"
            sale_price={80} // هذا اختياري
            className="" 
            photo={sliderPhoto.src}
          />
          <Card
            name="Product Name"
            description="This is a great product."
            price={100}
            newtrend="most selling"
            sale_price={80} // هذا اختياري
            className="" 
            photo={slider.src}
          />
          <Card
            name="Product Name"
            description="This is a great product."
            price={100}
            newtrend="most selling"
            sale_price={80} // هذا اختياري
            className="" 
            photo={slider.src}
          />
        </div>

    </div>
  </>
}

export default Grills