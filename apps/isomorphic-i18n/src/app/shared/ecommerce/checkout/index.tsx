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
import { useEffect, useState } from 'react';
import MapWithZones from '@/app/components/ui/inputs/map/MapWithZones';
import { RadioGroup } from '@headlessui/react';

import { BriefcaseBusiness, Building, Home } from 'lucide-react';
import { useUserContext } from '@/app/components/context/UserContext';
import { API_BASE_URL } from '@/config/base-url';
import { MadeOrderInput, madeOrderSchema } from '@/validators/checkoutcreditecard.schema';
import { useCart } from '@/store/quick-cart/cart.context';
import usePrice from '@hooks/use-price';
import { shopId } from '@/config/shopId';

type Address = {
  id: string;
  apartmentNumber: string;
  additionalDirections?: string;
  floor?: number;
  street: string;
  latitude: number;
  longtude: number;
  buildingType: number;
};

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
  const { orderNote, copone } = useUserContext();
  const { items, total, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useCart();
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  // console.log("total: ",total);
  
  const methods = useForm<MadeOrderInput>({
    mode: 'onChange',
    resolver: zodResolver(madeOrderSchema),
  });

  
  // Sample addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
	const [isAddressApiLoading, setIsAddressApiLoading] = useState(false);
	const { updateAddresses, setUpdateAddresses } = useUserContext();
  
  
	const fetchAddresses = async () => {
	  setIsAddressApiLoading(true);
	  const token = localStorage.getItem('accessToken');

	  try {
		const response = await fetch(`${API_BASE_URL}/api/Address/GetEndUserAddresses`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		  },
		});

		if (!response.ok) {
		  setIsAddressApiLoading(false);
		  throw new Error('Failed to fetch addresses');
		}

		const data = await response.json();

		const mappedAddresses = data.map((a: any) => ({
			id: a.id,
			additionalDirections: a.additionalDirections,
			apartmentNumber: a.apartmentNumber,
			floor: a.floor,
			street: a.street,
			latitude: a.latitude,
			longtude: a.longtude,
			buildingType: a.buildingType,
		}));
	
		  setAddresses(mappedAddresses);
      setUserLocation({
        lat: mappedAddresses[mappedAddresses?.length - 1]?.latitude,
        lng: mappedAddresses[mappedAddresses?.length - 1]?.longtude,
      })
      setSelectedAddressId(mappedAddresses[mappedAddresses?.length - 1]?.id)
		  setIsAddressApiLoading(false);
	  } catch (error) {
		// toast.error('Error fetching addresses');
		console.error('Error fetching addresses:', error);
		setIsAddressApiLoading(false);
	  }
	};
	
	useEffect(() => {
		fetchAddresses();
		if (updateAddresses === true) {
			fetchAddresses();
			setUpdateAddresses(false);	
		}
	}, [updateAddresses]);

  //  const addresses = [
  //   {
  //     id: 'd6a3d710-96ae-4197-ab6c-9494a735e400',
  //     additionalDirections: 'street',
  //     apartmentNumber: 122,
  //     floor: 'street',
  //     street: 'street',
  //     latitude: 31.201240111381715,
  //     longtude: 29.90064892297799,
  //     buildingType: 1,
  //   },
  //   {
  //     id: '46f1e3e0-6ac2-4d66-8758-f62474d5d635',
  //     additionalDirections: 'string',
  //     apartmentNumber: 0,
  //     floor: 'string',
  //     street: 'string',
  //     latitude: 30.013056,
  //     longtude: 31.208853,
  //     buildingType: 0,
  //   },
  // ];

  // Initial user location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: addresses[addresses?.length - 1]?.latitude,
    lng: addresses[addresses?.length - 1]?.longtude,
  });

  // Active selected address ID
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(addresses[addresses?.length - 1]?.id || null);

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

  console.log("errors: ",methods.formState.errors);
  
  const onSubmit: SubmitHandler<MadeOrderInput> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('paymentmethod', '0');
      formData.append('OrderType', '0');
      formData.append('TotalPrice', '0');
      formData.append('ShippingFees', '0');
      if (copone) {
        formData.append('CouponCode', copone);
      }
      if (orderNote) {
        formData.append('Notes', orderNote);
      }
      if (selectedAddressId) {
        formData.append('AddressId', selectedAddressId);
      }
      formData.append('ShopId', shopId);

      items.forEach((item, index) => {
        formData.append(`Items[${index}].quantity`, item.quantity.toString());
        if (item.notes) {
          formData.append(`Items[${index}].notes`, item.notes);
        }
        formData.append(`Items[${index}].productId`, item.id.toString());
        item.orderItemVariations?.forEach((order, orderIndex) => {
          if (order.variationId) {
            formData.append(`Items[${index}].orderItemVariations[${orderIndex}].variationId`, order.variationId);
          }
          order.choices?.forEach((choice, choiceIndex) => {
            if (choice.inputValue) {
              formData.append(`Items[${index}].orderItemVariations[${orderIndex}].choices[${choiceIndex}].inputValue`, choice.inputValue);
            }
            if (choice.choiceId) {
              formData.append(`Items[${index}].orderItemVariations[${orderIndex}].choices[${choiceIndex}].choiceId`, choice.choiceId);
            }
            if (choice.image) {
              formData.append(`Items[${index}].orderItemVariations[${orderIndex}].choices[${choiceIndex}].image`, choice.image);
            }
          })
        });
      });

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('No token found, please log in again.');
        return;
      }
      console.log("Token from localStorage:", token);
      const response = await fetch(`${API_BASE_URL}/api/Order/Create`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      const result = await response.text();
      
      if (response.ok) {
        // console.log('Order created successfully:', result);

        // Clear the cart items
        items.forEach(item => clearItemFromCart(item.id));
        // Display success toast
        toast.success(<Text as="b">Order placed successfully!</Text>);

        // Go to success page
        router.push("/");
        setLoading(false);
      } else {
        console.error('Error creating order:', result);
        toast.error(<Text as="b">Failed to place order. Please try again.</Text>);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during order submission:', error);
      toast.error(<Text as="b">An error occurred. Please try again later.</Text>);
      setLoading(false);
    }
  };
  
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
                  {/* <p>
                    Current Location: Latitude: {userLocation.lat}, Longitude: {userLocation.lng}
                  </p> */}
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
                  className="grid grid-cols-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-2 col-span-full"
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
                          <div className={cn('flex flex-col gap-2 max-w-full', className)}>
                            <span className={`px-3 py-2 rounded-lg transition duration-150 flex items-center gap-2 max-w-full`}>
                              {address.buildingType === 0 ? (
                                <Building className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              ) : address.buildingType === 1 ? (
                                <Home className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              ) : (
                                <BriefcaseBusiness className={`pt-1 ${checked ?'text-white':'text-orange-500'}`} />
                              )}
                              <span className='whitespace-nowrap overflow-hidden truncate max-w-[200px] sm:max-w-[80%]'>
                                {address.apartmentNumber}, {address.floor ? address.floor + ', ' : ''}
                                {address.street}
                              </span>
                            </span>
                            <p className={`px-6 ${checked ?'text-white/80':'text-black/50'} text-sm font-bold sm:whitespace-nowrap sm:overflow-hidden sm:truncate max-w-full`}>
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

                {/* <AddressInfo type="billingAddress" title="Billing Information" />

                <DifferentBillingAddress />

                {!sameShippingAddress && <AddressInfo type="shippingAddress" />}

                <OrderNote />

                <ShippingMethod />

                <PaymentMethod /> */}
              </div>
            </div>

            <OrderSummery lang={lang} isLoading={isLoading} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
