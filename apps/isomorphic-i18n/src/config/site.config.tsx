import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'اوردرات - انشاء مواقع الكترونية مجانا و أفضل المتاجر الإلكترونية',
  description: `اوردرات يوفر خدمة انشاء مواقع الكترونية مجانا. يمكنك إنشاء موقع إلكتروني أو متجر إلكتروني بسهولة وبدون تكلفة. افضل شركة انشاء مواقع تقدم لك خدمات متميزة. تابع العد التنازلي لإطلاق خدماتنا!`,
  logo: ``,
  logoAr: ``,
  icon: ``,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.LITHIUM,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  lang: string = 'en', 
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  const logoUrl = lang === 'ar' ? siteConfig.logoAr : siteConfig.logo;

  return {
    title: title ? `${title} ` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} ` : title,
      description,
      url: logoUrl,
      siteName: 'اوردرات - انشاء مواقع الكترونية مجانا و أفضل المتاجر الإلكترونية',
      images: [{
        url: logoUrl,
        width: 1200, // Ensure width is specified
        height: 630, // Ensure height is specified
      }],
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
  };
};

