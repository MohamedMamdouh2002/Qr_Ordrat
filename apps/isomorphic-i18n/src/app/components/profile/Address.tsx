import cn from '@utils/class-names';
import { BriefcaseBusiness, Building, Home } from 'lucide-react';
import React from 'react';

type Props = { address: Address; className?: string };

function Address({ address, className }: Props) {
	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<span className={`px-3 py-2 rounded-lg transition duration-150 flex items-center gap-2`}>
				{address.type === 0 ? (
					<Building className="pt-1 text-orange-500" />
				) : address.type === 1 ? (
					<Home className="pt-1 text-orange-500" />
				) : (
					<BriefcaseBusiness className="pt-1 text-orange-500" />
				)}
				{address.aptNo}, {address.floor ? address.floor + ', ' : ''}
				{address.street}
			</span>
			<p className="px-6 text-black/50 text-sm font-bold">
				{address.phoneNumber}
				<br />
				{address.additionalDirections}
			</p>
		</div>
	);
}

export default Address;
