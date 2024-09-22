import  cn  from '../../../../../../../packages/isomorphic-core/src/utils/class-names';
import { Check, Plus } from 'lucide-react';
import React from 'react';
import Price from './Price';

type Props = {
	type?: string;
	mainItem?: boolean;
	className?: string;
	action?: () => void;
	price?: string;
	oldPrice?: string;
	isAddedToCart?: boolean;
};

function AddToCartButton({
	className,
	mainItem = false,
	action,
	type = 'add',
	price,
	oldPrice,
	isAddedToCart
}: Props) {
	return (
		<button
			onClick={action}
			className={cn(
				'flex text-white bg-orange-500 px-2 py-1 rounded-lg font-bold items-center justify-center gap-1',
				className
			)}
		>
			{mainItem ? (
				<div className="w-full px-2 font-normal flex items-center justify-between">
					{type === 'add' ? 'Add item' : 'Update item'}
					<Price
						className="flex-col-reverse items-end"
						price={price!}
						PriceClassName="text-white"
						oldPriceClassName="text-white/90"
						oldPrice={oldPrice}
					/>
				</div>
			) : !isAddedToCart ? (
				<>
					<Plus className="text-white" />
					{type === 'add' ? 'Add' : 'Update'}
				</>
			) : (
				<>
					<Check className="text-white" /> <span>Added</span>
				</>
			)}
		</button>
	);
}

export default AddToCartButton;
