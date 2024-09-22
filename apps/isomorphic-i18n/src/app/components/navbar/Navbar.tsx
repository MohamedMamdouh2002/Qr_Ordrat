import React from 'react'
import { Banknote, Car, Info, Share2, Star, TicketPercentIcon, Timer } from 'lucide-react';
import { locale } from 'dayjs';
import { t } from 'i18next';
import Link from 'next/link';
import LanguageSwitcher from '@/app/i18n/language-switcher';
function Navbar( {className, lang }: {className?:string, lang?: string }) {
  return <>
    <div className="hidden lg:block h-14 bg-mainColor text-white text-sm" >
        <div className="w-[90%] mx-auto grid grid-cols-9 *:col-span-3 items-center justify-between py-4">
                <div className="flex items-center gap-3">
                    <TicketPercentIcon /><span>EGP 239.5 off on select items</span>
                </div>
                <div className="flex items-center mx-auto gap-5">
                    <div className="flex items-center gap-3">
                        <Timer /> 60 {t('mins')}
                    </div>
                    <div className="flex items-center gap-3">
                        <Banknote />  EGP 33.99

                    </div>
                    <div className="flex items-center gap-3">
                        <Car />
                        <div className="flex items-center gap-1">
                            {t('Restaurant')}
                            <Info className="text-white/75" size={12} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-end  w-full  col-span-3">
                <div className={'flex items-center gap-1 text-sm'}>
                    <Star className={`'fill-[#f1d045] text-[#f1d045]'`} size={14} />
                    <span className="">4.3</span>
                    <Link href={'/reviews'} className="underline font-light">
                        (<bdi>8, 206</bdi> {t('ratings')})
                    </Link>
                </div>
                    <Share2
                        onClick={() => {
                            if (navigator?.share) {
                                navigator
                                    .share({
                                        title: 'Karam el sham - qr menu',
                                        url: process.env.NEXT_PUBLIC_URL || 'https://localhost:3000'
                                    })
                                    .then(() => console.log('Successfully shared'))
                                    .catch(error => console.error('Something went wrong sharing', error));
                            } else {
                                console.error('Web Share API is not supported in this browser.');
                            }
                        }}
                        size={21}
                        className="cursor-pointer"
                    />
                       <LanguageSwitcher
                        lang={lang!}
                        className="me-3 rounded-none shadow-none"
                        variant="text"
                        />
                    {/* <LangChanger isTop={true} className="outline-0  bg-transparent" /> */}
                </div>
        </div>
    
    </div>
  </>
}

export default Navbar