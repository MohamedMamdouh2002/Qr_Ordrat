import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/types';
import isEmpty from 'lodash/isEmpty';
import { toCurrency } from '@utils/to-currency';
import { Title, Text } from 'rizzui';
import { AddToWishList } from '@components/wishlist-button';
import RemoveItem from '@/app/shared/ecommerce/cart/remove-item';
import QuantityInput from '@/app/shared/ecommerce/cart/quantity-input';
import { routes } from '@/config/routes';
import photo from '@public/assets/شاورما-عربي-لحمة-768x768.png'

export default function CartProduct({ product, lang , ifModal=false }: { product: CartItem; lang?:string; ifModal:boolean }) {
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 first:pt-0 sm:flex sm:gap-6 2xl:py-8">
      <figure className="col-span-4 sm:max-w-[180px]">
        <Image
          src={product.image||photo}
          alt={product.name}
          width={180}
          height={180}
          className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
        />
      </figure>
      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex  gap-1 flex-row items-start justify-between">
          <Title
            as="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
            {product.name}
          </Title>
          <div className="">

            <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
              {toCurrency(product.price, lang)}
            </span>
            {product.oldPrice?
              <li className={`flex items-center gap-3 text-gray-500`}>
                {/* <span>Old Price :</span> */}
                <del className="text-gray-1000 ">{toCurrency(product.oldPrice, lang)}</del>
              </li>
              :''
            }
          </div>
        </div>
        <Text className="mt-1 w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          {product.description}
        </Text>

        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr,1fr] gap-x-4 gap-y-3 sm:mt-4 sm:gap-x-8">
         
          {/* Map over orderItemVariations */}
          
          {ifModal===false && product.orderItemVariations?.map((variation) => (
            (variation.choices?.[0]?.choiceValue || variation.choices?.[0]?.inputValue) && (
              <li key={variation.variationId} className="flex items-center gap-3 text-gray-500">
                <span>{variation.variationLable} :</span>
                {variation.choices?.[0]?.choiceValue && (
                  <span className="text-gray-1000">{variation.choices[0].choiceValue}</span>
                )}
                {variation.choices?.[0]?.inputValue && (
                  <span className="text-gray-1000">{variation.choices[0].inputValue}</span>
                )}
              </li>
            )
          ))}
        </ul>
        <div className="mt-3 hidden items-center justify-between xs:flex sm:mt-6">
          <QuantityInput product={product} />
          <div className="flex items-center gap-4">
            {/* <AddToWishList /> */}
            <RemoveItem productID={product.id} placement="bottom-end" />
          </div>
        </div>
      </div>
      <div className="col-span-full flex items-center justify-between xs:hidden">
        <div className="flex items-center gap-4">
          {/* <AddToWishList /> */}
          <RemoveItem productID={product.id} placement="bottom-start" />
        </div>
        <QuantityInput product={product} />
      </div>
    </div>
  );
}
