import React from 'react'
import Title from '../ui/title/Title'
import Card from '../ui/card/Card'
import Image from 'next/image'
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/kfc-background.jpg'
import MediumCard from '../ui/mediumCard/MediumCard'
function PopularMeals() {
  return <>
    <div id="popular-meals" className="w-5/6 lg:w-[90%] mx-auto mt-20">
        <Title title='Popular meals' />
        <div className=" grid sm:grid-cols-2  my-10  gap-4  ">
               <MediumCard name={'mahse'} description={'This is a great product. This is a great product. This is a great product.'} newtrend='top rate' price={500} sale_price={80} photo={slider}/>
               <MediumCard name={'mahse'} description={'This is a great product. This is a great product. This is a great product.'} newtrend='top rate' price={500} sale_price={80} photo={slider}/>
               <MediumCard name={'mahse'} description={'This is a great product. This is a great product. This is a great product.'} newtrend='top rate' price={500} sale_price={80} photo={slider}/>
               <MediumCard name={'mahse'} description={'This is a great product. This is a great product. This is a great product.'} newtrend='top rate' price={500} sale_price={80} photo={slider}/>
               <MediumCard name={'mahse'} description={'This is a great product. This is a great product. This is a great product.'} newtrend='top rate' price={500} sale_price={80} photo={slider}/>
             
        </div>

    </div>
  </>
}

export default PopularMeals