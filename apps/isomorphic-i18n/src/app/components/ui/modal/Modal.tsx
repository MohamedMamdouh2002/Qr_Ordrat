import React, { useEffect, useState } from 'react';
import { Flame, Star, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import SpecialNotes from '../item/SpecialNotes';
import QuantityHandler from '../item/QuantityHandler';
import ItemPrice from '../ItemPrice';
import Badge from '../Badge';
import Image from 'next/image';
import { FullProduct, FoodId } from '@/types';
import { useUserContext } from '../../context/UserContext';
import cn from '../../../../../../../packages/isomorphic-core/src/utils/class-names';

type ModalProps = {
  data?: FullProduct;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  hasMoreDetails?: boolean;
  notes: string;
  setNotes: (val: string) => void;
  handleUpdateCart: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  modalId: string;
};

function Modal({
  setIsModalOpen,
  modalId,
  data,
  quantity,
  setQuantity,
  hasMoreDetails,
  notes,
  setNotes,
  handleUpdateCart,
}: ModalProps) {
  const [prodId, setProdId] = useState<FoodId | any>(null);
  const { GetProduct } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetProduct(modalId);
      setProdId(data);
    };
    fetchData();
  }, [GetProduct, modalId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <>
      {prodId && (
        <>
          <div className="hidden md:flex items-center justify-center">
            <div
              onClick={handleOutsideClick}
              className="fixed inset-0 flex z-[999] bg-black/20 items-center justify-center p-4"
            >
              <div className="bg-stone-100 rounded-lg b-4 w-[400px] min-h-auto max-h-[650px] overflow-y-auto scrollbar-hide">
                <div
                  className={cn('grid grid-cols-3 gap-2 relative', {
                    'grid-cols-1': !hasMoreDetails,
                  })}
                >
                  <div className="relative">
                    <Image
                      src={prodId.imageUrl}
                      width={500}
                      height={300}
                      alt="s"
                      className="w-full h-52 rounded-t-lg"
                    />
                    <X
                      onClick={handleClose}
                      className="bg-white rounded-full p-2 absolute top-2 start-2 hover:cursor-pointer"
                      size={36}
                    />
                    <div className="px-4 pt-2 flex flex-col">
                      <div className="flex items-center gap-2">
                        {prodId?.isTopSelling && (
                          <Badge Icon={Flame} title="Top Sale" className="-ms-1" />
                        )}
                        {prodId?.isTopRated && (
                          <Badge Icon={Star} title="Top Rated" className="-ms-1" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold leading-10">{prodId?.name}</h3>
                      <p className="text-sm font-medium text-black/75">{prodId?.description}</p>
                      <SpecialNotes notes={notes} setNotes={setNotes} />
                    </div>
                    {/* Rest of modal content... */}
                  </div>
                  {/* Modal Footer */}
                  <div className="col-span-full w-full h-10 grid grid-cols-3 gap-0 bg-white rounded-b-lg">
                    <QuantityHandler
                      quantity={quantity}
                      setQuantity={setQuantity}
                      className="shadow-none w-full h-full rounded-none "
                    />
                    <div className="col-span-2">
                      <ItemPrice
                        // type={data?.type}
                        action={handleUpdateCart}
                        price={`EGP ${prodId?.price! * quantity}`}
                        oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                        className={cn(
                          'rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none',
                          { 'rounded-br-none rtl:rounded-bl-none': hasMoreDetails }
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 md:z-10 z-[9999]" onClick={handleOutsideClick} />
          <motion.div
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
            className="fixed bottom-0 right-0 left-0 md:hidden flex items-end z-[10000] bg-black"
          >
            <div className="bg-stone-100 rounded-lg b-4 w-full max-h-screen flex flex-col">
                <div className="relative flex-shrink-0">
                    <Image src={prodId.imageUrl} width={900} height={600} alt="s" className="w-full h-60" />
                    <X onClick={handleClose} className="bg-white rounded-full p-2 absolute top-2 start-2" size={36} />
                </div>
                <div className="overflow-y-auto flex-1 p-4">
                    <div className="flex items-center gap-2">
                        {data?.isTopRated && <Badge Icon={Star} title="Top rated" className="-ms-1" />}
                        {data?.isTopSelling && <Badge Icon={Flame} title="Top Selling" className="-ms-1" />}
                    </div>
                    <h3 className="text-xl font-bold leading-10">{prodId?.name}</h3>
                    <p className="text-sm font-medium text-black/75">{prodId?.description}</p>
                    <SpecialNotes notes={notes} setNotes={setNotes} />
                    
                    {prodId?.variations && (
                    <>
                        <div className="flex flex-col gap-3 ">
                        {prodId.variations.map((item: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; choices: any[]; }) => (
                            <div key={item.id} className="flex items-start justify-between p-4">
                            <div className="flex flex-col gap-1">
                                <strong>Your choice of:</strong>
                                <span className='text-black/75'>{item.name}</span>
                                {item.choices && item.choices.length > 0 ? (
                                <ul className=" ">
                                    {item.choices.map((choice: { name: string }, index: React.Key | null | undefined) => (
                                        <li key={index} className="text-black/75 ">
                                            <input type='radio' />{" "}
                                            {choice?.name}
                                        </li>
                                    ))}
                                </ul>
                                ) : (
                                <span className="text-black/75">No choices available</span>
                                )}
                            </div>
                            <div className="text-white bg-black px-2 py-1 rounded-full text-sm">Required</div>
                            </div>
                        ))}
                        </div>
                    </>
                    )}
                    {prodId?.frequentlyOrderedWith && (
                        <div>
                            {prodId.frequentlyOrderedWith.map((item: { relatedProduct: { imageUrl: string ; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; oldPrice: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }; }, index: React.Key | null | undefined) => (
                                <div key={index}>
                                    <h3 className="font-bold mb-2">Related Product:</h3>
                                    {item.relatedProduct && (
                                        <div className=" border border-dashed border-orange-500 rounded-lg p-2 w-28">
                                            <Image
                                                src={item.relatedProduct.imageUrl}
                                                width={200}
                                                height={300}
                                                alt="s"
                                                className="w-40"
                                            />
                                            <p className='text-sm mb-1 font-medium'> {item.relatedProduct.name}</p>
                                            <div className="flex gap-3">
                                                <p className='text-[10px] text-mainColor'>EGP {item.relatedProduct.price}</p>
                                                <del className='text-[10px]'>EGP {item.relatedProduct.oldPrice}</del>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {prodId?.reviews && prodId.reviews.length > 0 && (
                        <div>
                            <h3 className="font-bold">Reviews:</h3>
                            {prodId.reviews.map((review: { endUser: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }; rate: any; reviewText: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                                <div key={index}>
                                    <p>User: {review.endUser?.name}</p>
                                    <p className='flex'>Rating: <Badge Icon={Star} title={`${review.rate} `} className="ms-1" /></p>
                                    <p>Review: {review.reviewText}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className=' items-center col-span-full w-full grid grid-cols-3 gap-0 bg-white rounded-b-lg'>
                    <div className={cn('bg-white rounded-bl-lg rtl:rounded-br-lg h-full', { 'rtl:rounded-bl-none': hasMoreDetails })}>
                        <QuantityHandler quantity={quantity} setQuantity={setQuantity} className='shadow-none w-full h-full rounded-none' />
                    </div>
                    <div className={'col-span-2'}>
                        <ItemPrice
                            // type={type}
                            action={handleUpdateCart}
                            price={`EGP ${data?.price! * quantity}`}
                            oldPrice={data?.oldPrice ? `EGP ${data.oldPrice * quantity}` : undefined}
                            className={cn('rounded-none rounded-br-lg rtl:rounded-bl-lg rtl:rounded-br-none', { 'rounded-br-none rtl:rounded-bl-none': hasMoreDetails })}
                        />
                    </div>
                </div>
            </div>
            
        </motion.div>
        </>
      )}
    </>,
    document.body
  );
}

export default Modal;
