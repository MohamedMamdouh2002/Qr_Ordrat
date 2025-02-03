import Grills from "@/app/components/grills/Grills";
import LoginBanner from "@/app/components/loginBanner/LoginBanner";
import MainSlider from "@/app/components/mainSlider/MainSlider";
import NavMobile from "@/app/components/navMobile/NavMobile";
import RestaurantTitle from "@/app/components/restaurantTitle/RestaurantTitle";
// import SyrianFood from "@/app/components/syrianFood/SyrianFood";
import { metaObject } from "@/config/site.config";
import Header from "@/app/components/header/Header";
import ScrollToTop from "@/app/components/ui/ScrollToTop";
import { Metadata } from "next";


type LangType = 'en' | 'ar';

const languages = {
  en: {
    title: 'Orders - Create free websites and the best online stores',
    description: `Orderat provides a free website creation service. You can create a website or an online store easily and without cost. The best website creation company provides you with distinguished services. Follow the countdown to launch our services!`,
    ogTitle: 'Orders - Create free websites and the best online stores',
    ogDescription: 'Orderat provides a free website creation service. You can create a website or an online store easily and without cost. The best website creation company provides you with distinguished services. Follow the countdown to launch our services!',
    ogSiteName: 'Orders',
  },
  ar: {
    title: 'أوردرات - إنشاء مواقع مجانية وأفضل المتاجر الإلكترونية',
    description: 'تقدم أوردرات خدمة إنشاء مواقع مجانية. يمكنك إنشاء موقع ويب أو متجر إلكتروني بسهولة وبدون تكلفة. أفضل شركة إنشاء مواقع إلكترونية تقدم لك خدمات مميزة. تابع العد التنازلي لإطلاق خدماتنا!',
    ogTitle: 'أوردرات - إنشاء مواقع مجانية وأفضل المتاجر الإلكترونية',
    ogDescription: 'تقدم أوردرات خدمة إنشاء مواقع مجانية. يمكنك إنشاء موقع ويب أو متجر إلكتروني بسهولة وبدون تكلفة. أفضل شركة إنشاء مواقع إلكترونية تقدم لك خدمات مميزة. تابع العد التنازلي لإطلاق خدماتنا!',
    ogSiteName: 'أوردرات',
  },
};

export const generateMetadata = ({ params }: { params: { lang?: string } }): Metadata => {
  const lang: LangType = params.lang === 'ar' ? 'ar' : 'en'; 
  const selectedLang = languages[lang];

  return metaObject(
    selectedLang.title, 
    lang,
    {
      title: selectedLang.ogTitle,
      description: selectedLang.ogDescription,
      url: '',
      siteName: selectedLang.ogSiteName,
      images: [
        {
          url: '',
          width: 1200,
          height: 630,
          alt: selectedLang.ogTitle,
        },
      ],
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    selectedLang.description
  );
};

export default function FileDashboardPage({
  params: { lang },
}: {
  params: {
    lang?: string;
  };
}) {
  return<>
    <ScrollToTop/>
    <RestaurantTitle lang={lang}/>
    <NavMobile lang={lang!}/>
    <Header lang={lang!}/>
    <MainSlider/>
    <Grills lang={lang!}/>
    {/* <PopularMeals/> */}
    {/* <SyrianFood/> */}
    {/* <Offers/> */}
    
  </>
}
