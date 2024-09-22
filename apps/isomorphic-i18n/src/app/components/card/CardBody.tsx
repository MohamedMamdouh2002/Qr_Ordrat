import React from 'react'
import { locale } from 'dayjs';
import { t } from 'i18next';
import Link from 'next/link';
import CartTemplate from '@/app/shared/ecommerce/cart';
function CardBody( {className, lang }: {className?:string, lang?: string }) {
  return <>
  <div className='w-[90%] mx-auto mt-8'>
    <CartTemplate />
  </div>
  </>
}

export default CardBody