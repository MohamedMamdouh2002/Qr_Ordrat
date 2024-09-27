import Image from 'next/image';
import { Title, Text } from 'rizzui';
import cn from '../../../../../../../packages/isomorphic-core/src/utils/class-names';
import { useState } from 'react';
import Modal from '../modal/Modal';

type ProductProps = {
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  newtrend?: string;
  className?: string;
  photo: any;
};

const Card = ({ name, description, price, sale_price, newtrend, className, photo }: ProductProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة التحكم في ظهور المودال

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={cn('group', className)}>
      <div onClick={handleOpenModal} className="sm:w-5/6 hover:scale-105 duration-200">
        <div className="relative w-full">
          <Image
            alt="l"
            src={photo}
            width={300}
            height={268}
            quality={90}
            className="h-[130px] md:h-[268px] w-full rounded-lg"
          />
          <span className="absolute end-2 top-2 text-[10px] font-bold p-1 min-w-10 rounded-lg bg-[#FECACA] text-[#EF4444]">
            {newtrend}
          </span>
        </div>
        <Title as="h6" className="mb-1 truncate font-semibold transition-colors group-hover:text-mainColor">
          {name}
        </Title>
        <Text as="p" className="truncate">
          {description}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-mainColor">
          {price} {/* toCurrency(Number(price)) */}
          {sale_price && (
            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              {sale_price} {/* toCurrency(Number(sale_price)) */}
            </del>
          )}
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Card;
