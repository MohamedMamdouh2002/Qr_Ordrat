import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, Building, Home, Trash2Icon } from 'lucide-react';
import Address from './Address';
import MapEmbed from '../ui/inputs/map/MapEmbed';
import ActionModal from '../layout/ActionModal';
import { useUserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/config/base-url';

type Props = {
	address: Address;
	i: number;
	setIsOpen?: (val: boolean) => void;
	setSelectedAddress: (val: {} | undefined) => void;
};

function AddressItem({ address, i, setIsOpen, setSelectedAddress }: Props) {
	const [deleteModal, setDeleteModal] = useState(false);
	console.log("address: ",address);
	const { setUpdateAddresses } = useUserContext();

	const deleteAddress = async () => {
		const token = localStorage.getItem('accessToken');
		if (!token) {
			toast.error('No token found. Please log in again.');
			return;
		}
		try {
			const response = await fetch(`${API_BASE_URL}/api/Address/DeleteEndUserAddress?id=${address.id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`,
					'accept': '*/*'
				}
			});

			const result = await response.json();

			if (response.ok) {
				toast.success(result.message || 'Address deleted successfully');
				setUpdateAddresses(true);
			} else {
				toast.error(result.message || 'Failed to delete address.');
			}
		} catch (error) {
			console.error('Error deleting address:', error);
			toast.error('An error occurred while deleting the address.');
		}
	};

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
						action={deleteAddress}
						title={`هل انت متأكد من حذف هذا العنوان ؟`}
						description="لن تتمكن من إعادة هذا العنوان مره اخري في حالة الحذف."
					/>
				)}
			</AnimatePresence>
		</>
	);
}

export default AddressItem;
