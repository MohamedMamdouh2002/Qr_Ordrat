'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import Logo from '@public/assets/karam-el-sham.png';
import { useTranslation } from '@/app/i18n/client';
import { LogIn, LogOut, ReceiptText, User, Users } from 'lucide-react';
import Modal from '../ui/Modal';
import Login from '../authPopups/Login';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';


type Props = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};

export const SideNav = ({ isOpen, setIsOpen }: Props, { lang }: { lang?: string }) => {
	const [hasAccount, setHasAccount] = useState(false);
	const [currentModal, setCurrentModal] = useState<'login' | 'register' | 'resetPassword'>('login');
	const [loginModal, setLoginModal] = useState(false);
	const pathname = usePathname();
	const { t } = useTranslation(lang!, 'loginForm');
	const router = useRouter();
	const modalRef = useRef<HTMLDivElement>(null); // استخدم useRef للإشارة إلى المودال

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setIsOpen(false); // أغلق المودال عند النقر خارج نطاقه
			}
		};
	
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
	
		// Cleanup the event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const links = hasAccount
		? [
				{
					icon: <User />,
					href: '/profile',
					title: t('profile')
				},
				{
					icon: <ReceiptText />,
					href: '/my-orders',
					title: t('myOrders')
				},
				{
					icon: <Users />,
					href: '/affiliate-program',
					title: t('affiliateProgram')
				},
				{
					icon: <LogOut />,
					action: () => {
						setIsOpen(false);
						router.refresh();
					},
					title: t('logout')
				}
		  ]
		: [
				{
					icon: <LogIn />,
					action: () => setLoginModal(true),
					title: t('login')
				}
		  ];

	return (
		<>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[999]">
				<div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
				<motion.div
					initial={{ x: 25, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 25, opacity: 0 }}
					className="fixed end-0 top-0 p-4 min-h-screen flex w-64 items-start justify-start bg-stone-100 border-start"
					ref={modalRef} // ربط ref بالمودال
				>
					<Dialog.Panel className="w-full py-2 px-2">
						<div className="w-full flex flex-col gap-5">
							<Image width={60} height={60} src={Logo} alt="logo" />
							<div className="flex items-center px-3 font-bold text-black/50">
								{/* {hasAccount ? `${t('welcomeBack')}${session.firstName}!` : t('loginNow')} */}
								Welcome
							</div>
							{links.map((link, i) => {
								const isActive = link.href === pathname;
								return link?.href ? (
									<Link
										onClick={() => setIsOpen(false)}
										key={i}
										href={link.href}
										className={`navlink font-bold transition flex items-center px-3 gap-2 relative duration-150 py-2 hover:text-orange-500 ${
											isActive ? 'text-orange-500' : 'text-black/50'
										}`}
										data-active={isActive}
									>
										{link.icon}
										<span className="capitalize">{link.title}</span>
									</Link>
								) : (
									<button
										onClick={link.action}
										key={i}
										className={`navlink font-bold transition flex items-center px-3 gap-2 relative duration-150 py-2 hover:text-orange-500 ${
											isActive ? 'text-orange-500' : 'text-black/50'
										}`}
										data-active={isActive}
									>
										{link.icon}
										<span className="capitalize">{link.title}</span>
									</button>
								);
							})}
						</div>
					</Dialog.Panel>
				</motion.div>
			</Dialog>
			<AnimatePresence mode="wait">
				{loginModal && (
					<Modal isOpen={loginModal} setIsOpen={setLoginModal}>
						{currentModal === 'login' ? (
							<Login
								setCurrentModal={setCurrentModal}
								onLogin={() => {
									setLoginModal(false);
									setIsOpen(false);
								}}
							/>
						) : currentModal === 'register' ? (
							<></>
							// <Register setCurrentModal={setCurrentModal} />
						) : (
							<></>
							// <ResetPassword setCurrentModal={setCurrentModal} />
						)}
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};
