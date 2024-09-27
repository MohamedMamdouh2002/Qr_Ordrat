'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@ui/form';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { recentlyProducts, recommendationProducts } from '@/data/shop-products';
import CartProduct from '@/app/shared/ecommerce/cart/cart-product';
import { useCart } from '@/store/quick-cart/cart.context';
import usePrice from '@hooks/use-price';
import { Empty, EmptyProductBoxIcon, Title, Text, Input, Button } from 'rizzui';
import ProductCarousel from '@/app/shared/product-carousel';
import cardImage from '../../../../../public/assets/card.png'
import sandwitsh from '../../../../../public/assets/sandwitsh.jpg'
import SpecialNotes from '@/app/components/ui/SpecialNotes';
import { useUserContext } from '@/app/components/context/UserContext';


type FormValues = {
  couponCode: string;
};

function CheckCoupon() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ couponCode: '' });
  };

  return (
    <Form<FormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { couponCode: '' },
      }}
      className="w-full"
    >
      {({ register, formState: { errors }, watch }) => (
        <>
          <div className="relative flex items-end">
            <Input
              type="text"
              placeholder="Enter coupon code"

              inputClassName="text-sm [&.is-hover]:border-mainColor [&.is-focus]:border-mainColor [&.is-focus]:ring-mainColor"
              className="w-full"
              label={<Text>Do you have a promo code?</Text>}
              {...register('couponCode')}
              error={errors.couponCode?.message}
            />
            <Button
              type="submit"

              className={`ms-3 ${watch('couponCode') ? 'bg-mainColor hover:bg-mainColorHover dark:hover:bg-mainColor/90' : 'bg-muted/70'}`}
              disabled={watch('couponCode') ? false : true}
            >
              Apply
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

// remove item

// cart product card

// total cart balance calculation
function CartCalculations() {
  const router = useRouter();
  const { total } = useCart();
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  return (
    <div>
      <Title as="h2" className="border-b border-muted pb-4 text-lg font-medium">
        Cart Totals
      </Title>
      <div className="mt-6 grid grid-cols-1 gap-4 @md:gap-6">
        <div className="flex items-center justify-between">
          Subtotal
          <span className="font-medium text-gray-1000">$140.00</span>
        </div>
        <div className="flex items-center justify-between">
          Tax
          <span className="font-medium text-gray-1000">$0.18</span>
        </div>
        <div className="flex items-center justify-between">
          Shipping
          <span className="font-medium text-gray-1000">$50.00</span>
        </div>
        <CheckCoupon />
        <div className="mt-3 flex items-center justify-between border-t border-muted py-4 font-semibold text-gray-1000">
          Total
          <span className="font-medium text-gray-1000">{totalPrice}</span>
        </div>
        <Link href={routes.eCommerce.checkout}>
          <Button
            size="xl"
            rounded="pill"
            onClick={() => router.push(routes.eCommerce.checkout)}

            className="w-full bg-mainColor hover:bg-mainColorHover"
          >
            Proceed To Checkout
          </Button>
        </Link>
        <Button
          size="xl"
          variant="outline"
          rounded="pill"

          className="w-full dark:bg-gray-100 dark:active:bg-gray-100 hover:border-mainColor"
        >
          <Image
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/payment/paypal.png"
            alt="paypal-icon"
            width={80}
            height={10}
            className="object-contain"
          />
        </Button>
      </div>
    </div>
  );
}

export default function CartPageWrapper() {
  // const items = [
  //   {
  //       "id": 1,
  //       "name": "Kebab Sandwich",
  //       "slug": "kebab-sandwich-2",
  //       "description": "yogurt salad m,Syrian Bread",
  //       "image": cardImage,
  //       "price": 142,
  //       "quantity": 1,
  //       "size": "small",
  //       "color": {
  //           "name": "Purple Heart",
  //           "code": "#5D30DD"
  //       },
  //       "itemTotal": 142
  //   },
  //   {
  //       "id": 2,
  //       "name": "sandwitsh",
  //       "slug": "sandwitsh-1",
  //       "description": "very very delicious sandwitsh",
  //       "image": sandwitsh,
  //       "price": 295,
  //       "quantity": 2,
  //       "size": "large",
  //       "color": {
  //           "name": "Alizarin Crimson",
  //           "code": "#D72222"
  //       },
  //       "itemTotal": 590
  //   },
  //   {
  //       "id": 3,
  //       "name": "Kebab Sandwich-2",
  //       "slug": "kebab-sandwich-2",
  //       "description": "yogurt salad m,Syrian Bread",
  //       "image": cardImage,
  //       "price": 142,
  //       "quantity": 1,
  //       "size": "small",
  //       "color": {
  //           "name": "Purple Heart",
  //           "code": "#5D30DD"
  //       },
  //       "itemTotal": 142
  //   },
  //   {
  //       "id": 4,
  //       "name": "sandwitsh-2",
  //       "slug": "sandwitsh-2",
  //       "description": "very very delicious sandwitsh",
  //       "image": sandwitsh,
  //       "price": 295,
  //       "quantity": 2,
  //       "size": "large",
  //       "color": {
  //           "name": "Alizarin Crimson",
  //           "code": "#D72222"
  //       },
  //       "itemTotal": 590
  //   },
  //   {
  //       "id": 5,
  //       "name": "Kebab Sandwich-3",
  //       "slug": "kebab-sandwich-3",
  //       "description": "yogurt salad m,Syrian Bread",
  //       "image": cardImage,
  //       "price": 142,
  //       "quantity": 1,
  //       "size": "small",
  //       "color": {
  //           "name": "Purple Heart",
  //           "code": "#5D30DD"
  //       },
  //       "itemTotal": 142
  //   },
  //   {
  //       "id": 6,
  //       "name": "sandwitsh-3",
  //       "slug": "sandwitsh-3",
  //       "description": "very very delicious sandwitsh",
  //       "image": sandwitsh,
  //       "price": 295,
  //       "quantity": 2,
  //       "size": "large",
  //       "color": {
  //           "name": "Alizarin Crimson",
  //           "code": "#D72222"
  //       },
  //       "itemTotal": 590
  //   },
  // ];

  const { items } = useCart();
  const [notes, setNotes] = useState('');

  
  return (
    <div className="@container">
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="@5xl:col-span-8 @6xl:col-span-7">
          {items.length ? (
            items.map((item) => <CartProduct key={item.id} product={item} />)
          ) : (
            <Empty
              image={<EmptyProductBoxIcon />}
              text="No Product in the Cart"
            />
          )}
        </div>
        <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <div className="flex flex-col gap-3">
            <div>
              <Title as="h2" className="border-b border-muted pb-4 mb-6 text-lg font-medium">
                Special request
              </Title>
              <SpecialNotes
                des="Anything else we need to know?"
                className="py-0 col-span-full"
                notes={notes}
                setNotes={setNotes}
              />
            </div>
            <CartCalculations />
          </div>
        </div>
      </div>
{/* 

      <ProductCarousel
        title={'Recommendations'}
        data={recommendationProducts}
      />

      <ProductCarousel title={'Recently Viewed'} data={recentlyProducts} /> */}
    </div>
  );
}
