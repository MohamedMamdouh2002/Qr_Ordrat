import Grills from "@/app/components/grills/Grills";
import LoginBanner from "@/app/components/loginBanner/LoginBanner";
import MainSlider from "@/app/components/mainSlider/MainSlider";
import NavMobile from "@/app/components/navMobile/NavMobile";
import RestaurantTitle from "@/app/components/restaurantTitle/RestaurantTitle";
// import SyrianFood from "@/app/components/syrianFood/SyrianFood";
import { metaObject } from "@/config/site.config";
import Header from "@/app/components/header/Header";


export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return<>

    <RestaurantTitle/>
    <NavMobile lang={lang}/>
    <Header/>
    <MainSlider/>
    <Grills lang={lang}/>
    {/* <PopularMeals/> */}
    {/* <SyrianFood/> */}
    {/* <Offers/> */}
    
  </>
}
