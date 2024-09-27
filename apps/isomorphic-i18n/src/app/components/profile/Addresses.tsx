'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import AddressItem from './AddressItem';
import { Loader2, Plus } from 'lucide-react';
import AddressModal from './AddressModal';
import NotFound from '../ui/NotFound';

type Props = {};

function Addresses({}: Props) {
	const data = {
		addresses: [
			{
				id: '1'
			}
		]
	};
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<any>();
	return (
		<>
			<div className="w-full grid xs:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 lg:px-8">
				<AnimatePresence mode="wait">
					{data && data.addresses.length > 0 ? (
						Array.from({length:3}).map((_, i) => {
							return (
								<AddressItem
									key={i}
									address={{
										id: 'fasd',
										aptNo: '2',
										lat: 30.023173855111207,
										lng: 31.185028997638923,
										phoneNumber: '+201020273407',
										street: 'haram',
										type: 'apartment',
										floor: 5,
										additionalDirections: 'cairo mall'
									}}
									i={i}
									setIsOpen={setIsOpen}
									setSelectedAddress={setSelectedAddress}
								/>
							);
						})
					) : isLoading ? (
						<span className="w-full flex flex-col items-center justify-center gap-3 dark:text-stone-400 text-lighterText">
							جاري التحميل ...
							<Loader2 className="text-mainColor  animate-spin" />
						</span>
					) : (
						!isLoading && !data && <NotFound name="عناوين" />
					)}
				</AnimatePresence>
				<button
					onClick={() => {
						setSelectedAddress(undefined);
						setIsOpen(true);
					}}
					className="self-center col-span-full w-40 mx-auto large:self-start flex gap-1 items-center px-3 py-2 rounded-lg text-white border border-transparent hover:border-mainColor bg-mainColor hover:bg-transparent hover:text-mainColor  transition duation-150"
				>
					<Plus />
					New Address
				</button>
			</div>
			<AnimatePresence mode="wait">
				{isOpen && <AddressModal isOpen={isOpen} setIsOpen={setIsOpen} address={selectedAddress} />}
			</AnimatePresence>
		</>
	);
}

export default Addresses;
