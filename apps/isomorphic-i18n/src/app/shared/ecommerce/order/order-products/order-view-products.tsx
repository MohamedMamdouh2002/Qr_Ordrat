'use client';

import Image from 'next/image';
import Table, { HeaderCell } from '@/app/shared/table';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text } from 'rizzui';
import { toCurrency } from '@utils/to-currency';
import { CartItem } from '@/types';
const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Product 1",
    slug: "product-1",
    description: "Description of Product 1",
    image: "/path/to/image1.jpg", // يمكنك استبدال هذا بصورة ثابتة
    color: null,
    price: 100,
    salePrice: 90,
    quantity: 2,
    size: 10,
    sizeFood: "Large",
    stock: 50,
    discount: 10,
  },
  {
    id: 2,
    name: "Product 2",
    slug: "product-2",
    description: "Description of Product 2",
    image: "/path/to/image2.jpg", // يمكنك استبدال هذا بصورة ثابتة
    color: null,
    price: 150,
    quantity: 1,
    size: 12,
    stock: 20,
  },
  // يمكنك إضافة المزيد من العناصر هنا
];
const columns = [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (_: any, row: CartItem) => (
      <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Image
            alt={row.name}
            src={row.image}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
        <div className="ms-4">
          <Title as="h6" className="!text-sm font-medium">
            {row.name}
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Product Price" align="right" />,
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (price: number) => (
      <Text className="text-end text-sm">{toCurrency(price)} ddd</Text>
    ),
  },
  {
    title: <HeaderCell title="Quantity" align="center" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 150,
    render: (quantity: number) => (
      <Text className="text-center text-sm font-semibold">{quantity}</Text>
    ),
  },
  {
    title: <HeaderCell title="Total Price" align="right" />,
    dataIndex: 'price',
    key: 'totalPrice',
    width: 200,
    render: (price: number, row: CartItem) => (
      <Text className="text-end text-sm">
        {toCurrency(price * row.quantity)}
      </Text>
    ),
  },
];

export default function OrderViewProducts() {
  const { items } = useCart();
  return (
    <Table
      data={items}
      // @ts-ignore
      columns={columns}
      className="text-sm"
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 800 }}
    />
  );
}
