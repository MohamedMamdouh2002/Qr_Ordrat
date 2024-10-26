import Order from '@/app/components/order/MyOrder';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('orders'),
};

export default function Orders({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <Order lang={lang}/>;
}
