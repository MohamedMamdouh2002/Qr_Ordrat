import Image from 'next/image';
import { Title, Text } from 'rizzui';
import cn from '../../../../../../../packages/isomorphic-core/src/utils/class-names';
import { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../modal/Modal';
import { Food, Product } from '@/types';
import Badge from '../Badge';
import { Star, Flame } from 'lucide-react';

type Props = Food & {
  lang:string;
  setCurrentItem: Dispatch<
    SetStateAction<{
      type?: string;
      id: string;
    } | null>
  >;
};

const Card = (data:Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!isModalOpen && (
        <div onClick={handleOpenModal} className="hover:scale-105 hover:cursor-pointer  w-[100%] duration-200">
          <div className="relative w-full h-[100px] xs:h-[200px] md:h-[200px] lg:h-[220px] xl:h-[270px] 2xl:h-[300px]">
            <Image
              alt="card food"
              src={data?.imageUrl}
              layout="fill"
              objectFit="cover"
              quality={90}
              className="rounded-lg"
            />
          </div>
            {data?.isTopRated || data.isTopSelling ? (
               <span className="text-[8px] font-bold text-center min-w-10 rounded-lg bg-[#FECACA] text-[#EF4444]">
               {data?.isTopRated ? 
                 <>
                   <Badge Icon={Star} title="Top Rated" className="-ms-1 mt-2" />
                 </>
                 :
                 <>
                   <Badge Icon={Flame} title="Top Sell" className="-ms-1 mt-2" />
                 </>
               }
             </span>
            ) : (
              ""
            )}
          <Title as="h6" className="my-1 truncate font-semibold transition-colors group-hover:text-mainColor">
            {data.name}
          </Title>
          <Text as="p" className="truncate">
            {data.description}
          </Text>
          <div className="mt-2 flex items-center font-semibold text-mainColor">
            EGP{data.price}
            {data.oldPrice && (
              <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              EGP {data.oldPrice}
              </del>
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal
          lang={data.lang} 
          modalId={data.id}
          setIsModalOpen={handleCloseModal}
          quantity={quantity}
          setQuantity={setQuantity}
          notes={''}
          setNotes={() => {}}
          setShowItem={() => {}}
        />
      )}
    </>
  );
};

export default Card;
