import Reviews from '@/app/components/reviews/Reviews'
import React from 'react'

const Review: React.FC =({lang}: { lang?: string }) => {
  return <>
  <div className="w-[90%] mx-auto mt-20">
    <Reviews lang={lang!}/>   
  </div>
  </>
}

export default Review