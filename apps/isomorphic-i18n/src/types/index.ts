import type { CouponType } from "@/config/enums";
import { StaticImageData } from "next/image";


export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export interface ProductColor {
  name?: string;
  code?: string;
}

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string | StaticImageData;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size?: number;
  sizeFood?: string;
  stock?: number;
  discount?: number;
}



export interface PosProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
}
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}

 export type FullProduct = {
  id: string
  vat: number
  vatType: number
  discount: number
  discountType: number
  isTopSelling: boolean
  isTopRated: boolean
  seoDescription: string
  categoryId: string
  numberOfSales: number
  variations: Array<{
    id: string
    name: string
    buttonType: number
    isActive: boolean
    productId: string
    choices: Array<{
      id: string
      name: string
      price: number
      isDefault: boolean
      isActive: boolean
      variationId: string
    }>
  }>
  frequentlyOrderedWith: Array<{
    productId: string
    relatedProductId: string
    relatedProduct: {
      id: string
      price: number
      oldPrice: number
      imageUrl: string
    }
  }>
  reviews: Array<{
    reviewText: string
    rate: number
    createdAt: string
    lastUpdatedAt: string
    endUserId: string
  }>
  name: string
  price: number
  oldPrice: number
  description: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  lastUpdatedAt: string
  isOffer: boolean
}

export interface Product {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
}
export type AllCategories = {
  id: string;
  imageUrl: string;
  priority: number;
  isActive: boolean;
  numberOfProducts: number;
  bannerUrl?: string;
  numberOfColumns: '1' | '2' | 'full';
  products: Food[];
  name: string;
};

export type Food = {
    id: string
    isTopSelling: boolean
    isTopRated: boolean
    name: string
    price: number
    oldPrice: number
    description: string
    imageUrl: string
    isActive: boolean
    createdAt: string
    lastUpdatedAt: string
    isOffer: boolean
}

export type FoodId= {
  id: string;
  name: string;
  description: string;
  vat: number;
  vatType: number;
  discount: number;
  discountType: number;
  isActive: boolean;
  createdAt: string;
  lastUpdatedAt: string;
  isTopSelling: boolean;
  isTopRated: boolean;
  seoDescription: string | null;
  imageUrl: string;
  categoryId: string;
  numberOfSales: number;
  category: string | null;
  variations: any[]; // يمكنك تخصيص نوع البيانات بناءً على شكل الـ variations إذا كانت معلومة.
  frequentlyOrderedWith: any[]; // يمكنك تخصيص نوع البيانات بناءً على شكل الـ frequentlyOrderedWith إذا كانت معلومة.
  reviews: any[]; // يمكنك تخصيص نوع البيانات بناءً على شكل الـ reviews إذا كانت معلومة.
  price: number;
  oldPrice?: number; // الحقل اختياري لأنه يمكن أن يكون غير موجود في بعض الحالات.
}
export type Review = {
  id: string;
  createdAt: string;
  endUser: {
    name: string;
  };
  reviewText: string;
  rate: number;
};


export type OrderItem = {
  quantity: number;
  totalChoicesPrice: number;
  itemPrice: number;
  productId: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

export type orderAdress = {
  id: string;
  additionalDirections?: string;
  apartmentNumber?: number;
  floor?: string;
  street?: string;
  latitude?: number;
  longtude?: number;
  buildingType?: number;
};

export type Order = {
  id: string;
  totalPrice: number;
  totalVat: number;
  shippingFees: number;
  createdAt: string;
  status: number;
  totalChoicePrices: number;
  address:orderAdress;
  items: OrderItem[];
};
