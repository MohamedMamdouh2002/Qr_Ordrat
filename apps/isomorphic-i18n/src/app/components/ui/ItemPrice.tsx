import React from 'react'
import AddToCartButton from './item/AddToCartButton';
import cn from '@utils/class-names';

// import cn from '../../../../../../../isomorphic/packages/isomorphic-core/src/utils/class-names';

type Props = {
	type?: string;
	action: () => void;
	price: string;
	oldPrice?: string;
	className?: string
};

function ItemPrice({ type, action, price, oldPrice, className }: Props) {
	return (
		<div className="grow">
			<AddToCartButton
				type={type}
				mainItem={true}
				action={action}
				className={cn("w-full py-2", className)}
				price={price}
				oldPrice={oldPrice}
			/>
		</div>
	);
}

export default ItemPrice