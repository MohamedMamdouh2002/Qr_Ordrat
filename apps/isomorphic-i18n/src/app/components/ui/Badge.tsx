import cn from '../../../../../../../isomorphic/packages/isomorphic-core/src/utils/class-names';
import { LucideProps, Star } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

type Props = {
	Icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	title: string;
	className?: HTMLAttributes<HTMLDivElement>['className'];
};

function Badge({ Icon, title, className }: Props) {
	return (
		<div
			className={cn(
				'flex items-center gap-1 bg-red-200 text-red-500 font-bold text-xs w-fit px-2 py-1 rounded-lg',
				className
			)}
		>
			<Icon className="fill-red-500 text-red-500" size={12} /> {title}
		</div>
	);
}

export default Badge;
