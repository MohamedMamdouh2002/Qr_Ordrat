'use client';

import {
  useForm,
  useWatch,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form';
import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import DifferentBillingAddress from '@/app/shared/ecommerce/order/order-form/different-billing-address';
import { orderData } from '@/app/shared/ecommerce/order/order-form/form-utils';
import AddressInfo from '@/app/shared/ecommerce/order/order-form/address-info';
import ShippingMethod from '@/app/shared/ecommerce/checkout/shipping-method';
import PaymentMethod from '@/app/shared/ecommerce/checkout/payment-method';
import OrderSummery from '@/app/shared/ecommerce/checkout/order-summery';
import OrderNote from '@/app/shared/ecommerce/checkout/order-note';
import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import { Text } from 'rizzui';
import cn from '@utils/class-names';
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import {
  CreateOrderInput,
  orderFormSchema,
} from '@/validators/create-order.schema';
import { useState } from 'react';
import MapWithZones from '@/app/components/ui/inputs/map/MapWithZones';
import { RadioGroup } from '@headlessui/react';

import { BriefcaseBusiness, Building, Home } from 'lucide-react';

// main order form component for create and update order
export default function CheckoutPageWrapper({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const setOrderNote = useSetAtom(orderNoteAtom);
  const setBillingAddress = useSetAtom(billingAddressAtom);
  const setShippingAddress = useSetAtom(shippingAddressAtom);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      sameShippingAddress: orderData.sameShippingAddress,
      shippingMethod: orderData.shippingMethod,
    },
  });

  const sameShippingAddress = useWatch({
    control: methods.control,
    name: 'sameShippingAddress',
  });

  const onSubmit: SubmitHandler<CreateOrderInput> = (data) => {
    setOrderNote(data?.note as string);
    if (sameShippingAddress) {
      setBillingAddress(data.billingAddress);
      setShippingAddress(data.billingAddress);
    } else {
      if (!isEmpty(data.shippingAddress)) {
        setShippingAddress(data.shippingAddress);
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log('checkout_data', data);
      router.push(routes.eCommerce.orderDetails(DUMMY_ID));
      toast.success(<Text as="b">Order placed successfully!</Text>);
    }, 600);
  };
  
   // Sample addresses
   const addresses = [
    {
      id: 'd6a3d710-96ae-4197-ab6c-9494a735e400',
      additionalDirections: 'street',
      apartmentNumber: 122,
      floor: 'street',
      street: 'street',
      latitude: 31.201240111381715,
      longtude: 29.90064892297799,
      buildingType: 1,
    },
    {
      id: '46f1e3e0-6ac2-4d66-8758-f62474d5d635',
      additionalDirections: 'string',
      apartmentNumber: 0,
      floor: 'string',
      street: 'string',
      latitude: 30.013056,
      longtude: 31.208853,
      buildingType: 0,
    },
  ];

  // Initial user location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 30.013056,
    lng: 31.208853,
  });

  // Active selected address ID
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(addresses[1]?.id || null);

  // Handle location change from the map
  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setUserLocation(newLocation); // Update user location when the marker is moved
    setSelectedAddressId(null); // Deselect the radio option if the user picks a location manually
    console.log('New user location:', newLocation);
  };

  // Handle address selection from the radio group
  const handleAddressSelection = (address: typeof addresses[0]) => {
    setUserLocation({ lat: address.latitude, lng: address.longtude });
    setSelectedAddressId(address.id);
  };

  // Define some zones (circles) with center points and radii
  const zones = [
    { center: { lat: 30.013056, lng: 31.208853 }, radius: 2000, color: '#FF0000' }, // Central Giza
    { center: { lat: 30.001219, lng: 31.168858 }, radius: 1800, color: '#00FF00' },  // Near Pyramids
    { center: { lat: 29.976480, lng: 31.131302 }, radius: 1300, color: '#0000FF' },  // Giza Pyramids
    { center: { lat: 30.020817, lng: 31.275039 }, radius: 1000, color: '#FFFF00' },  // Eastern Giza
  ];

  return (
    <div className='w-[90%] mx-auto mt-8'>
      <FormProvider {...methods}>
        <form
          // @ts-ignore
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'isomorphic-form isomorphic-form mx-auto flex w-full max-w-[1536px] flex-grow flex-col @container [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
            <div className="gap-4 border-muted @container @5xl:col-span-8 @5xl:border-e @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
              <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
                <div>
                  <MapWithZones
                    initialLocation={userLocation}
                    onLocationChange={handleLocationChange}
                    zones={zones}
                  />
                  <p>
                    Current Location: Latitude: {userLocation.lat}, Longitude: {userLocation.lng}
                  </p>
                </div>

                {/* Address selection via radio buttons */}
                <RadioGroup
                  value={selectedAddressId}
                  onChange={(val) => {
                    const selectedAddress = addresses.find((a) => a.id === val);
                    if (selectedAddress) {
                      handleAddressSelection(selectedAddress);
                    }
                  }}
                  className="grid md:flex grid-cols-3 gap-1 sm:gap-2 col-span-full"
                >
                  {addresses.map((address) => (
                    <RadioGroup.Option key={address.id} value={address.id}>
                      {({ checked }) => (
                        <div
                          className={`px-1 sm:px-3 py-2 flex items-center gap-1 sm:gap-2 w-full capitalize cursor-pointer rounded-lg transition duration-150 ${
                            checked ? 'bg-mainColor text-white' : 'bg-gray-200'
                          }`}
                        >
                          {/* <p>{`Apartment No: ${address.apartmentNumber}, Street: ${address.street}`}</p>
                          <p>{`Floor: ${address.floor}, Directions: ${address.additionalDirections}`}</p> */}
                          <div className={cn('flex flex-col gap-2', className)}>
                            <span className={`px-3 py-2 rounded-lg transition duration-150 flex items-center gap-2`}>
                              {address.buildingType === 0 ? (
                                <Building className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              ) : address.buildingType === 1 ? (
                                <Home className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              ) : (
                                <BriefcaseBusiness className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              )}
                              {address.apartmentNumber}, {address.floor ? address.floor + ', ' : ''}
                              {address.street}
                            </span>
                            <p className={`px-6 ${checked ?'text-white/80':'text-black/50'} text-sm font-bold`}>
                              {/* {address.phoneNumber}
                              <br /> */}
                              {address.additionalDirections}
                            </p>
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>

                <AddressInfo type="billingAddress" title="Billing Information" />

                <DifferentBillingAddress />

                {!sameShippingAddress && <AddressInfo type="shippingAddress" />}

                <OrderNote />

                <ShippingMethod />

                <PaymentMethod />
              </div>
            </div>

            <OrderSummery lang={lang} isLoading={isLoading} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
