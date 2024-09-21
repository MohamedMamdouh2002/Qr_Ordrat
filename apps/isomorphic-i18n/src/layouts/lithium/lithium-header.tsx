"use client";

import Link from "next/link";
import { Badge, ActionIcon, Input } from "rizzui";
import cn from "@utils/class-names";
import MessagesDropdown from "@/layouts/messages-dropdown";
import NotificationDropdown from "@/layouts/notification-dropdown";
import ProfileMenu from "@/layouts/profile-menu";
import SettingsButton from "@/layouts/settings-button";
import HamburgerButton from "@/layouts/hamburger-button";
import Logo from "@components/logo";
import {
  PiBellSimpleRingingDuotone,
  PiChatsCircleDuotone,
  PiGearDuotone,
  PiMagnifyingGlassBold,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import HeaderMenuLeft from "@/layouts/lithium/lithium-menu";
import Sidebar from "@/layouts/hydrogen/sidebar";
import StickyHeader from "@/layouts/sticky-header";
import LanguageSwitcher from "@/app/i18n/language-switcher";
import SearchWidget from "@/app/shared/search/search";
import Navbar from "@/app/components/navbar/Navbar";
import Image from "next/image";
import logo from '@public/assets/karam-el-sham.png'
import { AlignCenter, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {/* <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className={cn(
            " relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10 "
          )}
        >
          <PiChatsCircleDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </MessagesDropdown>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className={cn(
            "relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10"
          )}
        >
          <PiBellSimpleRingingDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </NotificationDropdown>
      <SettingsButton className="rounded-full text-gray-700 shadow-none backdrop-blur-none hover:text-gray-1000 3xl:h-10 3xl:w-10 dark:bg-gray-100/0">
        <PiGearDuotone className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton>
      <ProfileMenu
        buttonClassName="w-auto sm:w-auto p-1 border border-gray-300"
        avatarClassName="!w-7 !h-7 sm:!h-8 sm:!w-8"
      /> */}
    </div>
  );
}

export default function Header({ lang }: { lang?: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [isStickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setStickyVisible(true);  // Show StickyHeader and hide Navbar when scrolling
      } else {
        setStickyVisible(false); // Show both Navbar and StickyHeader when at the top
      }

      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);
  return <>
  <Navbar className={`  ${isStickyVisible ? "hidden" : ""}`} />

<StickyHeader
  className={` border-b-2 fixed top-0 w-full z-[990] py-3  ${
    isStickyVisible ? "bg-orange-500/75 backdrop-blur-lg *:text-white border-orange-500" : "mt-14 block bg-white"
  }`}
>
  <div className=" w-[90%] mx-auto z-[990] flex justify-between 2xl:py-1 3xl:px-8">
    <div className="hidden items-center gap-3 xl:flex">
      <Link
        aria-label="Site Logo"
        href="/"
        className="me-4 hidden w-[210px] shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:flex gap-4 items-center"
      >
        <Image src={logo} alt="logo" className="max-w-[50px]" />
        <h1 className="font-bold text-lg">Karam El Sham</h1>
      </Link>
      <HeaderMenuLeft lang={lang} />
    </div>
    <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
      <div className="flex w-full max-w-2xl items-center xl:w-auto gap-4">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" lang={lang} />}
        />
        <Link
          aria-label="Site Logo"
          href="/"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>
        <Input
          type="search"
          placeholder="Are you looking for something?"
          value=""
          className="w-72 outline-none focus:outline-none border-none hover:outline-none hover:border-none"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        <Link href="/cart">
          <ShoppingCart className="transition duration-150 hover:text-orange-500" />
        </Link>
        <button className="transition duration-150 hover:text-orange-500">
          <AlignCenter />
        </button>
      </div>
      <HeaderMenuRight />
    </div>
  </div>
</StickyHeader>
  </>
  
}
