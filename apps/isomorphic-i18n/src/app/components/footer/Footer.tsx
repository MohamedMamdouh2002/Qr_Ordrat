import React from 'react';
// import Logo from './Logo';
import  Link from 'next/link';
import logo from '@public/assets/karam-el-sham.png'

import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n/client';
import { BsWhatsapp } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopesBulk, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer({lang}:{lang:string}) {
	const { t } = useTranslation(lang! ,'nav');
	return (
    <div className=" mt-auto bg-orange-500/20">
      <div className="mt-10">
        <div className="w-[90%] mx-auto sm:grid lg:grid-cols-6 py-4">
          <div className="col-span-2 flex flex-col gap-2 me-10">
            <div className="w-fit flex items-center gap-4 ">
              <Image src={logo} alt="logo" className="max-w-[60px]" />
              <h3>Karam Elsham</h3>
            </div>
            <p className="text-sm font-light">Fried chicken, Sandwiches, Fast Food Fried chicken, Sandwiches, Fast Food Fried chicken, Sandwiches, Fast Food</p>
              <h4 className='mt-10'>Get in Touch</h4>
            <div className="flex items-center gap-2">
              <a className="bg-white rounded-full flex items-center justify-center text-orange-500 p-2 size-10 hover:bg-white transition duration-150 hover::fill-orange-500 hover::text-white cursor-pointer">
                <BsWhatsapp size={20} />
              </a>
              <a className="bg-white rounded-full flex items-center justify-center text-orange-500 p-2 size-10 hover:bg-white transition duration-150 hover::fill-orange-500 hover::text-white cursor-pointer">
                <Phone size={20} />
              </a>
              <a className="bg-white rounded-full flex items-center justify-center text-orange-500 p-2 size-10 hover:bg-white transition duration-150 hover::fill-orange-500 hover::text-white cursor-pointer">
                <Facebook size={20} />
              </a>
              <a className="bg-white rounded-full flex items-center justify-center text-orange-500 p-2 size-10 hover:bg-white transition duration-150 hover::fill-orange-500 hover::text-white cursor-pointer">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div className="">
              <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">myAccount</h3>
              <div className="flex flex-col gap-2">
                <Link
                  href={'/profile'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('profile')} 
                </Link>
                <Link
                  href={'/profile'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('profile')} 
                </Link>
                <Link
                  href={'/profile'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('profile')} 
                </Link>
                <Link
                  href={'/profile'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('profile')} 
                </Link>
                <Link
                  href={'/orders'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('orders')}
                </Link>
              </div>
          </div>
          <div className="">
              <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">
                {t('quickLinks')} 
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href={'/card'}
                  className="ps-1 text-black/75 transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('cart')} 
                </Link>
                <Link
                  href={'/search'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('search')} 
                </Link>
                <Link
                  href={'/reviews'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                {t('review')}
                </Link>
                <Link
                  href={'/faq'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('faq')}
                </Link>
              </div>
          </div>
          <div className="">
              <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">
                {t('quickLinks')} 
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href={'/card'}
                  className="ps-1 text-black/75 transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('cart')} 
                </Link>
                <Link
                  href={'/search'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('search')} 
                </Link>
                <Link
                  href={'/reviews'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                {t('review')}
                </Link>
                <Link
                  href={'/faq'}
                  className="ps-1 text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                >
                  {t('faq')}
                </Link>
              </div>
          </div>
          <div className="">
              <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">
                {t('contactUs')} 
              </h3>
              <div className="flex flex-col gap-2">
                <ul className='space-y-3 text-TextColor'>
                    <li>
                      ELDoki-Eltehrer street
                    </li>
                    <li  className='hover:text-mainColor  items-center  duration-200 w-fit'>
                        <Link className='flex gap-2 items-center' href={""}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+966 50 665 7111</span>
                            </Link>

                    </li>
                    <li  className='hover:text-mainColor  items-center duration-200 w-fit'>
                        <Link className='flex gap-2 items-center' href={""}>
                            <FontAwesomeIcon icon={faEnvelopesBulk} />{" "}<span>tariq@marosetravel.mail.com</span>
                        </Link>
                    </li>
                </ul>
              </div>
          </div>
        </div>
        <div className="border-t border-t-black/25 py-2 flex items-center justify-center text-center gap-2">
          <p className="text-sm w-[90%] font-medium text-black/copyRights">
            © 2024 • karamElsham is a registered Trademark of Functional Software, Ordrat.
          </p>
        </div>
      </div>
		</div>
	);
}

export default Footer;