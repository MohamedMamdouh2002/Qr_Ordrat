import CardBody from '@/app/components/card/CardBody';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('card'),
};

export default function Card({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <CardBody lang={lang}/>;
}
