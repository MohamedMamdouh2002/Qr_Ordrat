import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@public/assets/karam-el-sham.png'
import { ReceiptText, User } from 'lucide-react';

function SideNav({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
		  const sideNav = document.getElementById('side-nav');
		  if (sideNav && !sideNav.contains(event.target as Node)) {
			setIsOpen(false);
		  }
		};
	  
		if (isOpen) {
		  document.body.style.overflow = 'hidden'; // إلغاء التمرير
		  document.addEventListener('click', handleClickOutside);
		} else {
		  document.body.style.overflow = 'auto'; // استعادة التمرير
		}
	  
		return () => {
		  document.body.style.overflow = 'auto'; // استعادة التمرير عند فك التركيب
		  document.removeEventListener('click', handleClickOutside);
		};
	  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 pointer-events-none select-none  backdrop-blur-3xl"></div>


          <motion.div
            id="side-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0  w-[250px] h-screen z-[998] bg-white shadow-lg p-6"
          >
			<Link
				aria-label="Site Logo"
				href="/"
				className=" hidden  shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 lg:flex gap-2 items-center"
			>
				<Image src={logo} alt="logo" className="max-w-[50px]" />
				<h1 className={`font-semibold text-base text-black`}>Karam El Sham</h1>
			</Link>  
			<div className="ms-3 font-mono text-black">
				<h2 className='text-sm font-normal mt-5 '>Welcome back, {"Mohamed!"}</h2>
				<ul className="space-y-4 mt-10">
				<li className='flex font-semibold items-center gap-1'>
					<User/> Profile
				</li>
				<li className='flex font-semibold items-center gap-1 py-3'>
				<ReceiptText /> MY orders
				</li>
				<li className='flex font-semibold items-center gap-1'>
					<User/> Profile
				</li>
				
				</ul>
			</div>
           
          </motion.div>
        </>
      )}
    </>
  );
}

export default SideNav;
