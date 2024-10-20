'use client';

import Image from 'next/image';
import Table, { HeaderCell } from '@/app/shared/table';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text } from 'rizzui';
import { toCurrency } from '@utils/to-currency';
import { CartItem ,Order,OrderItem } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
// const cartItems: CartItem[] = [
//   {
//     id: 1,
//     name: "Product 1",
//     slug: "product-1",
//     description: "Description of Product 1",
//     image: "/path/to/image1.jpg", // يمكنك استبدال هذا بصورة ثابتة
//     color: null,
//     price: 100,
//     salePrice: 90,
//     quantity: 2,
//     size: 10,
//     sizeFood: "Large",
//     stock: 50,
//     discount: 10,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     slug: "product-2",
//     description: "Description of Product 2",
//     image: "/path/to/image2.jpg", // يمكنك استبدال هذا بصورة ثابتة
//     color: null,
//     price: 150,
//     quantity: 1,
//     size: 12,
//     stock: 20,
//   },
//   // يمكنك إضافة المزيد من العناصر هنا
// ];

// const columns = [
//   {
//     title: <HeaderCell title="Product" />,
//     dataIndex: 'product',
//     key: 'product',
//     width: 250,
//     render: (_: any, row: OrderItem) => (
//       <div className="flex items-center">
//         <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
//           <Image
//             alt={row?.product.name} 
//             src={row?.product.imageUrl} 
//             fill
//             sizes="(max-width: 768px) 100vw"
//             className="object-cover"
//           />
//         </div>
//         <div className="ms-4">
//           <Title as="h6" className="!text-sm font-medium">
//             {row.product.name} 
//           </Title>
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: <HeaderCell title="Product Price" align="right" />,
//     dataIndex: 'price',
//     key: 'price',
//     width: 200,
//     render: (_: any, item: OrderItem) => (
//       <Text className="text-sm text-center">{item.itemPrice}</Text>
//     ),
//   },
//   {
//     title: <HeaderCell title="Quantity" align="center" />,
//     dataIndex: 'quantity',
//     key: 'quantity',
//     width: 150,
//     render: (_: any, item: OrderItem) => (
//       <Text className="text-center text-sm font-semibold">{item.quantity}</Text>
//     ),
//   },
//     {
//       title: <HeaderCell title="Total Price" align="right" />,
//       dataIndex: 'totalPrice',
//       key: 'totalPrice',
//       width: 200,
//       render: (_: any, item: OrderItem) => (
//         <></>
//         // <Text className="text-end text-sm">{to}$</Text>
//       ),
//   },
// ];
const columns = [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product', // تغيير إلى 'product'
    key: 'product',
    width: 250,
    render: (product: any) => (
      <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Image
            alt={product.name}
            src={product.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
        <div className="ms-4">
          <Title as="h6" className="!text-sm font-medium">
            {product.name}
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="item Price" align="right" />,
    dataIndex: 'itemPrice', 
    key: 'itemPrice',
    width: 200,
    render: (itemPrice: number) => (
      <Text className="text-end text-sm">{toCurrency(itemPrice)}</Text>
    ),
  },
  {
    title: <HeaderCell title="shippingFees" align="right" />,
    dataIndex: 'shippingFees', 
    key: 'shippingFees',
    width: 200,
    render: (shippingFees: number) => (
      <Text className="text-end text-sm">{toCurrency(shippingFees)}</Text>
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
    title: <HeaderCell title="totalChoicePrices" align="right" />,
    dataIndex: 'totalChoicePrices',
    key: 'totalChoicePrices',
    width: 200,
    render: (totalChoicePrices: number) => (
      <Text className="text-end text-sm">{toCurrency(totalChoicePrices)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Total Price" align="right" />,
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 200,
    render: (totalPrice: number) => (
      <Text className="text-end text-sm">{toCurrency(totalPrice)}</Text>
    ),
  },
];

export default function OrderViewProducts() {
  const { items } = useCart();
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://testapi.ordrat.com/api/Order/GetById/${id}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data: Order = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }
  return (
    <Table
    data={order.items.map(item => ({
      ...order, 
      product: item.product, 
      itemPrice: item.itemPrice, 
      quantity: item.quantity, 
    }))}      // @ts-ignore
      columns={columns}
      className="text-sm"
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 800 }}
    />
  );
}
