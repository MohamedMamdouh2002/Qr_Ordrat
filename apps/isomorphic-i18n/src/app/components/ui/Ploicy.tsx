'use client'
import React from 'react'
import { useTranslation } from '@/app/i18n/client';
import Title from '../ui/title/Title';

type props = {
  title: string,
  descriptions?: {
    description: string
  }[],
  points?: {
    point: string
  }[],
}

function Policy({ lang, sections }: { lang?: string, sections: props[] }) {
  const { t } = useTranslation(lang!, 'policy');

  return (
    <div className="">
      {/* <Title className="text-center mt-20 text-[#404040]" title={t('privacypolicy')} /> */}
      {sections.map((section, index) => (
        <div key={index} className="mt-10">
          <h2 className="text-2xl font-medium mb-2">{section.title}</h2>

          {section?.descriptions?.map((desc, idx) => (
            <p key={idx} className="text-gray-700 text-base font-normal mb-4">{desc.description}</p>
          ))}

          {section?.points && (
            <ul className="list-disc list-inside space-y-2 marker:text-mainColor">
              {section?.points?.map((point, idx) => (
                <li key={idx}>{point.point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Policy;
