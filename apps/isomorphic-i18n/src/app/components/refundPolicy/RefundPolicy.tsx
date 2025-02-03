'use client'
import React from 'react'
import { useTranslation } from '@/app/i18n/client';
import Title from '../ui/title/Title';
import Policy from '../ui/Ploicy';

type props = {
  title: string,
  descriptions?: {
    description: string
  }[],
  points?: {
    point: string
  }[],
}

function RefundPolicy({ lang }: { lang?: string }) {
  const { t, i18n } = useTranslation(lang!, 'policy');

  const sections: props[] = [
    {
      title: t('refundpolicy'),
      descriptions: [
        { description: t('dataCollectionDesc') },
        { description: t('dataCollectionDesc1') },
        { description: t('dataCollectionDesc') },
      ],
      points: [
        { point: t('collectedData1') },
        { point: t('collectedData2') },
        { point: t('collectedData3') }
      ]
    },
    {
      title: t('privacypolicy'),
      descriptions: [
        { description: t('dataCollectionDesc') },

      ],

    },
    {
      title: t('privacypolicy'),
      descriptions: [
        { description: t('dataCollectionDesc') },
        { description: t('dataCollectionDesc1') },
        { description: t('dataCollectionDesc') },
      ],
      points: [
        { point: t('collectedData1') },
        { point: t('collectedData2') },
        { point: t('collectedData3') }
      ]
    },

  ];

  return (
    <div className="w-5/6 sm:w-8/12 mx-auto mb-10">
      <Title className="text-center mt-20 text-[#404040]" title={t('refundpolicy')}/>
      <Policy sections={sections} />
    </div>
  );
}

export default RefundPolicy;
