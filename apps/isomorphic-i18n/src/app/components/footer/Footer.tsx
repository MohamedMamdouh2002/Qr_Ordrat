'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from '@public/assets/karam-el-sham.png';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Login from '../authPopups/Login';
import { AnimatePresence } from 'framer-motion';
import Modal from '../ui/Modal';

type linksProps = {
  header: string;
  menu: {
    title: string;
    icon?: any;
    action?: any;
    href?: string;
  }[];
};

type mediaProps = {
  link: any;
  color: string;
  href: string;
};

type Props = {

	lang: string; // إضافة خاصية اللغة
};
function Footer({ lang }: Props) {
  const { t, i18n } = useTranslation(lang!, 'nav');
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [hasAccount, setHasAccount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<'login' | 'register' | 'resetPassword'>('login');
  const [loginModal, setLoginModal] = useState(false);
  const AccountBeforeLogin: linksProps[] = [
    {
      header: t('Account'),
      menu: [
        {
          title: t('login'),
          action: () => setLoginModal(true), 
        },
      ],
    },
    {
      header: t('quickLinks'),
      menu: [
        { title: t('cart'), href: `/${lang}/cart` },
        { title: t('search'), href: `/${lang}/search` },
        { title: t('review'), href: `/${lang}/reviews` },
        { title: t('faq'), href: `/${lang}/faq` },
      ],
    },
    {
      header: t('Policy'),
      menu: [
        { title: t('PrivacyPolicy'), href: `/${lang}/privacy-policy` },
        { title: t('refundPolicy'), href: `/${lang}/refund-Policy` },
      ],
    },
  ];

  const AccountAfterLogin: linksProps[] = [
    {
      header: t('Account'),
      menu: [
        { title: t('profile'), href: `/${lang}/profile` },
        { title: t('orders'), href: `/${lang}/orders` },
      ],
    },
    {
      header: t('quickLinks'),
      menu: [
        { title: t('cart'), href: `/${lang}/cart` },
        { title: t('search'), href: `/${lang}/search` },
        { title: t('review'), href: `/${lang}/reviews` },
        { title: t('faq'), href: `/${lang}/faq` },
      ],
    },
    {
      header: t('Policy'),
      menu: [
        { title: t('PrivacyPolicy'), href: `/${lang}/privacy-policy` },
        { title: t('refundPolicy'), href: `/${lang}/refund-Policy` },
      ],
    },
  ];

  const Links: mediaProps[] = [
    { link: faWhatsapp, color: '#1B8755', href: `https://wa.me/201234567890` },
    { link: faXTwitter, color: 'black', href: `https://x.com/?lang=ar` },
    { link: faFacebookF, color: '#0866FF', href: `https://www.facebook.com/` },
    { link: faInstagram, color: '#F400D1', href: `https://www.instagram.com/` },
  ];

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <div className="mt-auto bg-orange-500/20">
        <div className="mt-10">
          <div className="w-[90%] mx-auto grid md:grid-cols-2 lg:grid-cols-6 py-4 gap-6">
            {/* Logo Section */}
            <div className="col-span-2 flex flex-col gap-2 me-10">
              <div className="w-fit flex items-center gap-4">
                <Image src={logo} alt="logo" className="max-w-[60px]" />
                <h3>{t('title')}</h3>
              </div>
              <p className="text-sm font-light">{t('desc')}</p>
              <h4 className="mt-10">{t('Get-in-Touch')}</h4>
              <div className="flex items-center gap-2">
                {Links.map((i, index) => (
                  <a
                    key={index}
                    href={i.href}
                    className="bg-white rounded-full flex items-center justify-center text-orange-500 p-2 size-10 hover:bg-white transition duration-150 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={i.link} className="text-xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Account Links */}
            {(token ? AccountAfterLogin : AccountBeforeLogin).map((acc, index) => (
              <div key={index} className="">
                <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">{acc.header}</h3>
                <div className="flex flex-col gap-2">
                  {acc.menu.map((i, idx) =>
                    i.action ? (
                      <button
                        key={idx}
                        onClick={i.action}
                        className="text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                      >
                        {i.title}
                      </button>
                    ) : (
                      <Link
                        key={idx}
                        href={i.href!}
                        className="text-black/75 capitalize transition duration-150 hover:text-orange-500 w-fit"
                      >
                        {i.title}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="">
              <h3 className="font-bold text-lg h-[60px] capitalize flex items-center">
                {t('contact')}
              </h3>
              <div className="flex flex-col gap-2">
                <ul className="space-y-3 text-TextColor">
                  <li>{t('address')}</li>
                  <li className="hover:text-mainColor items-center duration-200 w-fit">
                    <Link className="flex gap-2 items-center" href="">
                      <span>+966 50 665 7111</span>
                    </Link>
                  </li>
                  <li className="hover:text-mainColor items-center duration-200 w-fit">
                    <Link className="flex gap-2 items-center" href="mailto:support.mail.com">
                      <span className="block max-w-[250px] md:max-w-[250px] lg:max-w-[120px] xl:max-w-xs break-words">
                        support.mail.com
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-t-black/25 py-2 flex items-center justify-center text-center gap-2">
            <p className="text-sm w-[90%] font-medium text-black/copyRights">
              © 2024 • karamElsham is a registered Trademark of Functional Software, Ordrat.
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      
      {loginModal && 
      			<AnimatePresence mode="wait">
            {loginModal && (
              <Modal isOpen={loginModal} setIsOpen={setLoginModal}>
                {currentModal === 'login' ? (
                  <Login
                    setCurrentModal={setCurrentModal}
                    onLogin={() => {
                      setLoginModal(false);
                      setIsOpen(false as any );
                      setHasAccount(true);
                    }}
                  />
                ) : currentModal === 'register' ? (
                  <></>
                ) : (
                  <></>
                )}
              </Modal>
            )}
          </AnimatePresence>
      }
    </>
  );
}

export default Footer;
