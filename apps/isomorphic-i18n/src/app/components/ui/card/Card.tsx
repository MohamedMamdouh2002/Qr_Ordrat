import Image from 'next/image';
import { Title, Text } from 'rizzui';
import cn from '../../../../../../../packages/isomorphic-core/src/utils/class-names';
import { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../modal/Modal';
import { Food, Product } from '@/types';
import Badge from '../Badge';
import { Star, Flame } from 'lucide-react';

type Props = Food & {
  setCurrentItem: Dispatch<
    SetStateAction<{
      type?: string;
      id: string;
    } | null>
  >;
};

const Card = (data: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة التحكم في ظهور المودال

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* إخفاء الديف عند فتح المودال */}
      {!isModalOpen && (
        <div onClick={handleOpenModal} className="hover:scale-105 hover:cursor-pointer  w-[100%] duration-200">
          <div className="relative w-full">
            <Image
              alt="card food"
              src={data.imageUrl}
              width={300}
              height={268}
              quality={90}
              className="h-[130px] md:h-[268px] w-full rounded-lg"
            />
            {data?.isTopRated || data.isTopSelling ? (
              <span className="  text-[8px] font-bold text-center min-w-10 rounded-lg bg-[#FECACA] text-[#EF4444]">
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
          </div>
          <Title as="h6" className="my-1 truncate font-semibold transition-colors group-hover:text-mainColor">
            {data.name}
          </Title>
          <Text as="p" className="truncate">
            {data.description}
          </Text>
          <div className="mt-2 flex items-center font-semibold text-mainColor">
            EGP{data.price} {/* toCurrency(Number(price)) */}
            {data.oldPrice && (
              <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              EGP  {data.oldPrice} {/* toCurrency(Number(sale_price)) */}
              </del>
            )}
          </div>

        </div>
      )}
      {isModalOpen && <Modal modalId={data.id} setIsModalOpen={handleCloseModal} quantity={0} setQuantity={function (value: SetStateAction<number>): void {
        throw new Error('Function not implemented.');
      } } notes={''} setNotes={function (val: string): void {
        throw new Error('Function not implemented.');
      } } handleUpdateCart={function (): void {
        throw new Error('Function not implemented.');
      } } setShowItem={function (val: boolean): void {
        throw new Error('Function not implemented.');
      } } />}
    </>
  );
};

export default Card;
