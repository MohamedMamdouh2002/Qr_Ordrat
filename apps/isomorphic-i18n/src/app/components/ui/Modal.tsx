'use client'
import { useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { domAnimation, LazyMotion, m } from 'framer-motion';
// import { cn } from '@/p';
import { useTranslation } from "@/app/i18n";
type Props = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	children: React.ReactNode;
	className?: string;
};
function Modal({ isOpen, setIsOpen, children, className }: Props, { lang }: { lang?: string }) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<LazyMotion features={domAnimation}>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-[999] flex h-screen items-center justify-center"
			>
				<div className="fixed inset-0 bg-black/30 backdrop-blur-md" aria-hidden="true" />
				<m.div
					initial={{
						scale: 0.8,
						x: '-50%',
						y: '-50%',
						opacity: 0
					}}
					animate={{
						scale: 1,
						x: '-50%',
						y: '-50%',
						opacity: 1
					}}
					exit={{
						scale: 0.8,
						x: '-50%',
						y: '-50%',
						opacity: 0
					}}
					className="fixed start-1/2 -translate-x-1/2 rtl:translate-x-1/2 top-1/2 -translate-y-1/2 rtl:translate-y-1/2 p-4 h-auto flex w-5/6 lg:w-2/5 items-start justify-start bg-white rounded-lg"
					ref={modalRef} // ربط ref بالمودال
				>
					<Dialog.Panel className={'py-2 px-2 lg:px-5 w-full h-full flex flex-col gap-5'}>
						{children}
					</Dialog.Panel>
				</m.div>
			</Dialog>
		</LazyMotion>
	);
}

export default Modal;
