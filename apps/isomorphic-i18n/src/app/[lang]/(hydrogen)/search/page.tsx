import Content from '@/app/components/search/Content';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('search'),
};

export default function Card({
  params: { lang },
}: {
  params: {
    lang?: string;
  };
}) {
  return <Content/>;
}
