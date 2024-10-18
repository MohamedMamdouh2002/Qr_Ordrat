import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, Building, Home, Trash2Icon } from 'lucide-react';
import Address from './Address';
import MapEmbed from '../ui/inputs/map/MapEmbed';
import ActionModal from '../layout/ActionModal';

type Props = {
	address: Address;
	i: number;
	setIsOpen?: (val: boolean) => void;
	setSelectedAddress: (val: {} | undefined) => void;
};

function AddressItem({ address, i, setIsOpen, setSelectedAddress }: Props) {
	const [deleteModal, setDeleteModal] = useState(false);
	return (
		<>
			<motion.div
				key={i}
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
				exit={{ opacity: 0, y: 15 }}
				className="flex w-full flex-col shadow-md relative"
			>
				{setIsOpen && (
					<div
						className="absolute top-2 right-2 border border-red-400 text-red-500 cursor-pointer hover:bg-red-500 hover:text-slate-50 transition duration-150 rounded-md p-1 flex items-center justify-center"
					>
						<Trash2Icon onClick={() => setDeleteModal(true)} size={24} className='w-[20px] h-[20px]'/>
					</div>
				)}
				<MapEmbed latitude={address.lat} longitude={address.lng} />
				<div className="grid grid-cols-4 items-center gap-3">
					{/* {setIsOpen && (
						<div className="text-red-500 col-span-1 cursor-pointer hover:bg-red-500 hover:text-slate-50 transition duration-150 rounded-lg h-full w-full flex items-center justify-center">
							<Trash2Icon onClick={() => setDeleteModal(true)} size={24} className="w-full" />
						</div>
					)} */}
					<div
						onClick={() => {
							setSelectedAddress(address);
							setIsOpen && setIsOpen(true);
						}}
						className={`cursor-pointer col-span-full w-full hover:bg-orange-500/20 py-2 px-3`}
					>
						<Address address={address} />
					</div>
				</div>
			</motion.div>
			<AnimatePresence mode="wait">
				{deleteModal && (
					<ActionModal
						isOpen={deleteModal}
						setIsOpen={setDeleteModal}
						action={() => {
							console.log(address);
						}}
						title={`هل انت متأكد من حذف هذا العنوان ؟`}
						description="لن تتمكن من إعادة هذا العنوان مره اخري في حالة الحذف."
					/>
				)}
			</AnimatePresence>
		</>
	);
}

export default AddressItem;
