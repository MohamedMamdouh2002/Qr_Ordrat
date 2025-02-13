'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@/app/i18n/client';
import Title from '../ui/title/Title';
import Policy from '../ui/Ploicy';
import axiosClient from '../fetch/api';

type props = {
  title: string,
  descriptions?: {
    description: string
  }[],
  points?: {
    point: string
  }[],
}

function PrivacyPolicy({ lang }: { lang?: string }) {
  const { t, i18n } = useTranslation(lang!, 'policy');
const [policy,setPolicy]=useState()
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // setLoading(true);
        const response = await axiosClient.get(`/api/Term/GetByShopIdAndType/952e762c-010d-4e2b-8035-26668d99e23e?termType=0`, {
          headers: {
            'Accept-Language': lang,
          },
        });
        setPolicy(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchOrders();
  }, [lang]);

  return (
    <div className="w-5/6 sm:w-8/12 mx-auto mb-10 ">
      <Title className="text-center mt-20 text-[#404040]" title={t('privacypolicy')}/>
    <Policy sections={policy} />
    </div>
  );
}

export default PrivacyPolicy;
