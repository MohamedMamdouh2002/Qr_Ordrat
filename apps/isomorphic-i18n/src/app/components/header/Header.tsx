import Image from 'next/image'
import React from 'react'
import logPhoto from '@public/assets/landing.png'
import Link from 'next/link'

function LoginBanner() {
  return <>
  <div className="bg-mainColor/30 h-[400px] hidden md:flex">
    <div className="w-[90%] mx-auto pt-10 relative  flex justify-between items-center">
      <div className="">
          <h2 className='text-2xl lg:text-3xl xl:text-5xl font-bold '>Welcome to <br/> Karam Elsham</h2>
          <h3 className='text-sm lg:text-lg xl:text-xl font-normal  my-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Perspiciatis
            quo doloribus impedit a harum, libero alias suscipit <br/> tempore molestias similique.
          </h3>
          <Link href={`/search`}>
            <button className='w-32 h-10 bg-mainColor rounded-md text-white'>
              View Product
            </button>
          </Link>
      </div>
      <div className="absolute bottom-0 end-0 xl:end-12">
          <Image src={logPhoto} width={900} height={500} className='w-[250px] xl:w-[400px] h-96' alt='logPhoto'/>
      </div>
    </div>
  </div>
  </>
}

export default LoginBanner