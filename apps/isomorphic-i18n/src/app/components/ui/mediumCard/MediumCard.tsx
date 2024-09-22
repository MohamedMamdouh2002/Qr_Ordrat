import Image from 'next/image'
import React from 'react'
type ProductProps = {
    name: string;
    description: string;
    price: number;
    sale_price?: number;
    newtrend?:string;
    className?: string;
    photo:any;
  };
function MediumCard({ name, description, price, sale_price , newtrend , className ,photo }: ProductProps) {
  return <>
    
            <div className="sm:flex hidden xl:w-[550px] 2xl:w-full h-[135px] border rounded-lg ">
                <Image src={photo} width={300} height={100} className='w-4/12 h-full sm:rounded-s-lg'  alt=''/>
                <div className="ms-5 mt-2 relative w-8/12">
                    <div className="flex justify-between items-center pe-2">
                        <h2 className='text-lg font-medium'>{name}</h2>
                        <span className=" text-[10px] font-bold p-1 min-w-10 rounded-lg bg-[#FECACA] text-[#EF4444]" >
                            {newtrend}
                        </span>
                    </div>
                    <h3 className=' text-sm font-normal'>{description}</h3>
                    <div className="mt-2 flex items-center font-semibold text-mainColor absolute bottom-2  ">
                        <span>EGP {price}</span>
                            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                               EGP {sale_price}
                            </del>
                    </div>
                </div>
            </div>
            <div className="sm:hidden flex justify-between   w-full h-[154px]   ">
                <div className="  relative w-4/6">
                    <div className="  pe-2">
                        <h2 className='text-lg font-medium'>{name}</h2>
                   
                    </div>
                    <h3 className='text-sm font-light  my-1 '>{description}</h3>
                    <span className=" text-[10px] font-bold p-1 min-w-10 rounded-lg my-1 bg-[#FECACA] text-[#EF4444]" >
                            {newtrend}
                    </span>
                    <div className="mt-2 flex items-center font-semibold text-mainColor absolute bottom-0  ">
                        <span>EGP {price}</span>
                            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                               EGP {sale_price}
                            </del>
                    </div>
                </div>
                <Image src={photo} width={300} height={100} className='w-[35%] h-[154px] rounded-lg'  alt=''/>
            </div>
                <hr className='mt-3 sm:hidden flex'/>
  </>
}

export default MediumCard