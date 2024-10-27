"use client"
import { Info, Link, Search, Share2, Star, TicketPercentIcon, User } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { } from 'rizzui'
import logo from '@public/assets/karam-el-sham.png'
import LanguageSwitcher from '@/app/i18n/language-switcher'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { useTranslation } from '@/app/i18n/client'
function RestaurantTitle({lang} :{lang? :string}) {
    const { t, i18n } = useTranslation(lang!, 'nav');

    useEffect(() => {
      i18n.changeLanguage(lang);
    }, [lang, i18n]);
  return <>

  	<div className={'flex lg:hidden -mt-20 rounded-xl flex-col  bg-slate-50 w-5/6 mx-auto z-10 text-black relative'}>
        <div className="flex items-start mt-6 justify-between">
            <div className="flex gap-6 items-start">
                <Image src={logo} width={100} height={100} className='-mt-5 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]' alt='logo'/>
                <div className="">
                    <h1 className='text-base'>{t('title')}</h1>
                    <h2 className='xs:text-sm text-xs font-normal truncate-text '>{t('desc')}</h2>
                    <div className="flex items-center gap-1">
                    <Star size={14}  color='#facc15' className='fill-yellow-400'/>
                    <p> 4.3(8, 206 {t(`rating`)})</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 me-5">
                <Info size={16}/>
                <Share2
                        // onClick={() => {
                        //     if (navigator?.share) {
                        //         navigator
                        //             .share({
                        //                 title: 'Karam el sham - qr menu',
                        //                 url: process.env.NEXT_PUBLIC_URL || 'https://localhost:3001'
                        //             })
                        //             .then(() => console.log('Successfully shared'))
                        //             .catch(error => console.error('Something went wrong sharing', error));
                        //     } else {
                        //         console.error('Web Share API is not supported in this browser.');
                        //     }
                        // }}
                        // className="cursor-pointer"
                        size={16}
                    />

            </div>
        </div>		
        <div className="flex flex-col  w-5/6 mx-auto py-5  z-10 rounded-lg">
					<div className="flex pt-2">
						<div className="basis-1/3 flex flex-col items-center justify-center font-light text-sm border-e pe-2">
							<strong className="font-light text-stone-800 text-center text-xs">
								{t('deliveryFee')}
							</strong>
							<span className=" font-light text-xs"> 33.99</span>
						</div>
						<div className="basis-1/3 flex flex-col items-center justify-center border-e px-2">
							<strong className="text-stone-800 text-center font-light text-xs">
								{t('delivery-Time')}
							</strong>
							<span className="text-xs font-light">60 {t('mins')}</span>
						</div>
						<div className="basis-1/3 flex flex-col items-center justify-center">
							<strong className="font-light text-stone-800 text-center text-xs">
								deliveryBy
                            </strong>
							<span className="flex items-center gap-1">
								<span className="text-xs font-light text-center">{t('Restaurant')}</span>
								<Info className="text-stone-700" size={14} />
							</span>
						</div>
					</div>
        </div>
			
		
    </div>
        <div className="flex lg:hidden bg-[#F87171] w-5/6  text-white items-center gap-3 mt-5 rounded-lg mx-auto px-4 h-16">
            <TicketPercentIcon /><span>{t('select-item')}</span>
        </div>
  </>
}

export default RestaurantTitle