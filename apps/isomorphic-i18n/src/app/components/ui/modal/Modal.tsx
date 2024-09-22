'use client';
import { DialogPanelProps } from '@headlessui/react';
import { Flame, Star, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SpecialNotes from '../item/SpecialNotes';
import QuantityHandler from '../item/QuantityHandler';
import ItemPrice from '../ItemPrice';
import OftenOrderedWith from '../item/OftenOrderedWith';
import { motion } from 'framer-motion';
import  cn  from '../../../../../../../packages/isomorphic-core/src/utils/class-names';
import Badge from '../Badge';
import Choices from '../item/Choices';
import img from "@public/assets/kfc-background.jpg";
import Image from 'next/image';
import sliderPhoto from '@public/assets/landing-poster.png'
import { FullProduct } from '@/types';
type Props = {
	data?: FullProduct;
	quantity: number;
	setQuantity: Dispatch<SetStateAction<number>>;
	hasMoreDetails?: boolean;
	notes: string;
	setNotes: (val: string) => void;
	handleUpdateCart: () => void;
	itemId?: string;
	setShowItem: (val: boolean) => void;
	type?: string;
};
type ModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

function Modal({ setIsModalOpen }: ModalProps,{
	data,
	quantity,
	setQuantity,
	hasMoreDetails,
	notes,
	setNotes,
	handleUpdateCart,
	itemId,
	setShowItem,
	type
}: Props)
 {
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // منع السكرول عند فتح المودال
        return () => {
          document.body.style.overflow = 'auto'; // إرجاع السكرول عند إغلاق المودال
        };
      }, []);
    
      const handleClose = () => {
        setIsModalOpen(false);
      };
    
      const handleOutsideClick = (e: { target: any; currentTarget: any; }) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      };
    
    
    return <>
            <div className="hidden md:flex items-center  justify-center">
                <div
                    onClick={handleOutsideClick}
                    className="fixed inset-0 flex z-[999] bg-black/20 items-center justify-center p-4"
                >
                    <div className="bg-stone-100 rounded-lg b-4">

                        <div
                            className={cn('grid grid-cols-3 mobile:flex mobile:flex-col gap-2 relative', {
                                'grid-cols-1': !hasMoreDetails
                            })}
                        >
                            <div className="relative">
                                <Image
                                    src={img}
                                    alt="s"
                                    
                                    className={cn('select-none rounded-t-lg', {
                                        'rounded-tr-none rtl:rounded-tr-lg rtl:rounded-tl-none mobile:rounded-tr-lg':
                                            hasMoreDetails
                                    })}
                                    
                                />
                                <X
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-white rounded-full p-2 absolute top-2 start-2"
                                    size={36}
                                />
                                <div className="px-4 pt-2 flex flex-col">
                                    <div className="flex items-center gap-2">
                                        {data?.isTopRated && <Badge Icon={Star} title="Top rated" className="-ms-1" />}
                                        {data?.isTopSelling && (
                                            <Badge Icon={Flame} title="Top Selling" className="-ms-1" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold leading-10">{data?.name}</h3>
                                    <p className="text-sm font-medium text-black/75">{data?.description}</p>
                                    <SpecialNotes notes={notes} setNotes={setNotes} />
                                </div>
                                <div
                                    className={
                                        'mobile:hidden items-center col-span-full w-full grid grid-cols-3 gap-0 bg-white rounded-b-lg'
                                    }
                                >
                                    <div
                                        className={cn('bg-white rounded-bl-lg rtl:rounded-br-lg h-full', {
                                            'rtl:rounded-bl-none': hasMoreDetails
                                        })}
                                    >
                                        <QuantityHandler
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            className={
                                                'shadow-none w-full h-full rounded-none mobile:px-0 mobile:justify-center'
                                            }
                                        />
                                    </div>
                                    <div className={'col-span-2'}>
                                        <ItemPrice
                                            type={type}
                                            action={handleUpdateCart}
                                            price={`EGP ${data?.price! * quantity}`}
                                            oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                                            className={cn(
                                                'rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none',
                                                {
                                                    'rounded-br-none rtl:rounded-bl-none': hasMoreDetails
                                                }
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            {hasMoreDetails && (
                                <div className="container">
                                    {data?.variations && data.variations.length > 0 && <Choices />}
                                    {data?.frequentlyOrderedWith && data?.frequentlyOrderedWith.length > 0 && (
                                        <OftenOrderedWith data={data.frequentlyOrderedWith} />
                                    )}
                                </div>
                            )}
                        </div>
                        <div
                            className={
                                'hidden items-center col-span-full w-full mobile:grid grid-cols-3 gap-0 bg-white rounded-b-lg'
                            }
                        >
                            <div className={'bg-white rounded-none h-full rounded-bl-lg rtl:rounded-br-lg'}>
                                <QuantityHandler
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    className={
                                        'shadow-none w-full h-full rounded-none mobile:px-0 mobile:justify-center'
                                    }
                                />
                            </div>
                            <div className={'col-span-2'}>
                                <ItemPrice
                                    type={type}
                                    action={handleUpdateCart}
                                    price={`EGP ${data?.price! * quantity}`}
                                    oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                                    className={cn('rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
            className="fixed bottom-0 right-0 left-0 md:hidden flex  items-end  z-50 bg-black/30 "
            onClick={handleOutsideClick} // عند الضغط على أي مكان خارج المودال
            >
                 <div className="bg-stone-100 rounded-lg b-4 w-full">

                 <div
    className={cn('grid grid-cols-6 mobile:flex mobile:flex-col gap-2 relative', {
        'grid-cols-1': !hasMoreDetails,
        'w-full h-full': true // تأكد من أن الديف يأخذ عرض وارتفاع كاملين بعد lg
    })}
>
    <div className="relative">
        <Image
            src={img}
            alt="s"
            
            className='w-full'
            
        />
        <X
            onClick={() => setIsModalOpen(false)}
            className="bg-white rounded-full p-2 absolute top-2 start-2"
            size={36}
        />
        <div className="px-4 pt-2 flex flex-col">
            <div className="flex items-center gap-2">
                {data?.isTopRated && <Badge Icon={Star} title="Top rated" className="-ms-1" />}
                {data?.isTopSelling && (
                    <Badge Icon={Flame} title="Top Selling" className="-ms-1" />
                )}
            </div>
            <h3 className="text-xl font-bold leading-10">{data?.name}</h3>
            <p className="text-sm font-medium text-black/75">{data?.description}</p>
            <SpecialNotes notes={notes} setNotes={setNotes} />
        </div>
        <div
            className={
                'mobile:hidden items-center col-span-full w-full grid grid-cols-3 gap-0 bg-white rounded-b-lg'
            }
        >
            <div
                className={cn('bg-white rounded-bl-lg rtl:rounded-br-lg h-full', {
                    'rtl:rounded-bl-none': hasMoreDetails
                })}
            >
                <QuantityHandler
                    quantity={quantity}
                    setQuantity={setQuantity}
                    className={
                        'shadow-none w-full h-full rounded-none mobile:px-0 mobile:justify-center'
                    }
                />
            </div>
            <div className={'col-span-2'}>
                <ItemPrice
                    type={type}
                    action={handleUpdateCart}
                    price={`EGP ${data?.price! * quantity}`}
                    oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                    className={cn(
                        'rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none',
                        {
                            'rounded-br-none rtl:rounded-bl-none': hasMoreDetails
                        }
                    )}
                />
            </div>
        </div>
    </div>
    {hasMoreDetails && (
        <div className="container">
            {data?.variations && data.variations.length > 0 && <Choices />}
            {data?.frequentlyOrderedWith && data?.frequentlyOrderedWith.length > 0 && (
                <OftenOrderedWith data={data.frequentlyOrderedWith} />
            )}
        </div>
    )}
                </div>
                <div
        className={
            'hidden items-center col-span-full w-full mobile:grid grid-cols-3 gap-0 bg-white rounded-b-lg'
        }
    >
        <div className={'bg-white rounded-none h-full rounded-bl-lg rtl:rounded-br-lg'}>
            <QuantityHandler
                quantity={quantity}
                setQuantity={setQuantity}
                className={
                    'shadow-none w-full h-full rounded-none mobile:px-0 mobile:justify-center'
                }
            />
        </div>
        <div className={'col-span-2'}>
            <ItemPrice
                type={type}
                action={handleUpdateCart}
                price={`EGP ${data?.price! * quantity}`}
                oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                className={cn('rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none')}
            />
        </div>
                </div>
                </div>
            </div>

    </>
	
}

export default Modal;
